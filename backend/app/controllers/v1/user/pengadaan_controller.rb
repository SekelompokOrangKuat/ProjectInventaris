class V1::User::PengadaanController < ApplicationController
    before_action :authorize_request
    
    def create
        if params[:nama_pengusul].blank?
            render json: {
                response_code: 422, 
                response_message: "Nama Pengusul tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            if params[:nama_barang].blank?
                render json: {
                    response_code: 422, 
                    response_message: "Nama barang tidak boleh kosong!"
                    }, status: :unprocessable_entity
            else
                if params[:nomor_register].blank?
                    render json: {
                        response_code: 422, 
                        response_message: "Nomor register tidak boleh kosong!"
                        }, status: :unprocessable_entity
                else
                    nomor_registered = Barang::Kibb.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
                    if nomor_registered.present?
                        render json: {
                            response_code: 422, 
                            response_message: "Nomor register tidak boleh sama!"
                            }, status: :unprocessable_entity
                    else
                        if barang = Barang::Kibb.create(
                            nama_ruangan: params[:nama_ruangan],
                            kode_lokasi: params[:kode_lokasi],
                            kode_barang: params[:kode_barang],
                            nama_barang: params[:nama_barang],
                            nomor_register: params[:nomor_register],
                            tipe_barang: params[:tipe_barang],
                            ukuran_barang: params[:ukuran_barang],
                            bahan_barang: params[:bahan_barang],
                            tahun_pembelian: params[:tahun_pembelian],
                            nomor_pabrik: params[:nomor_pabrik],
                            nomor_rangka: params[:nomor_rangka],
                            nomor_mesin: params[:nomor_mesin],
                            nomor_polisi: params[:nomor_polisi],
                            nomor_bpkb: params[:nomor_bpkb],
                            asal_usul: params[:asal_usul],
                            harga_barang: params[:harga_barang],
                            keterangan: params[:keterangan],
                            user_pengadaan: User::Pengadaan.create(
                                nama_pengusul: params[:nama_pengusul],
                                spesifikasi_barang: params[:spesifikasi_barang],
                                foto_barang: params[:foto_barang]))
                        
                            render json: {
                                response_code: 201, 
                                response_message: "Success", 
                                data: {pengadaan: barang.user_pengadaan, barang: barang}
                                }, status: :created
                        else
                            render json: {
                                response_code: 422, 
                                response_message: "Gagal membuat Pengadaan Barang!"
                                }, status: :unprocessable_entity
                        end
                    end
                end
            end
        end
    end

    def approval
        #Cek role
        if role.match(/Penggguna/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            if params[:id].blank?
                render json: {
                    response_code: 422, 
                    response_message: "id tidak boleh kosong!"
                    }, status: :unprocessable_entity
            else
                @approval_pengadaan = User::Pengadaan.new_pengadaan.where(_id: params[:id]).first
                @kibb = Barang::Kibb.where(user_pengadaan_id: params[:id])
                if @approval_pengadaan.present? 
                    if params[:is_approve].blank?
                        render json: {
                            response_code: 422, 
                            response_message: "is_approve tidak boleh kosong!"
                            }, status: :unprocessable_entity
                    else
                        if params[:is_approve] == true
                            status_usulan = Enums::StatusUsulan::ACCEPTED
                            status_kib = Enums::Kib::NEW
                        else
                            status_usulan = Enums::StatusUsulan::REJECTED
                            status_kib = @kibb.status_kib
                        end
                        @approval_pengadaan.assign_attributes({status_usulan: status_usulan})
                        @approval_pengadaan.save!(:validate => false)
                        @kibb.assign_attributes({status_kib: status_kib})
                        @kibb.save!(:validate => false)
                        render json: {
                            response_code: 200, 
                            response_message: "Success", 
                            data: @approval_pengadaan
                            }, status: :ok
                    end
                elsif @approval_pengadaan.status_usulan != Enums::StatusUsulan::NEW
                    render json: {
                        response_code: 422, 
                        response_message: "Pengadaan sudah dilakukan Approval!"
                        }, status: :unprocessable_entity
                else
                    render json: {
                        response_code: 422, 
                        response_message: "Pengadaan tidak dapat ditemukan!"
                        }, status: :unprocessable_entity
                end
            end
        end
    end

    def edit
        if params[:id].blank?
            render json: {
                response_code: 422, 
                response_message: "id tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            @pengadaan = User::Pengadaan.new_pengadaan.find(params[:id])
            if not @pengadaan.present?
                render json: {
                    response_code: 422, 
                    response_message: "Id tidak dapat ditemukan atau pengadaan sudah dilakukan approval!"
                    }, status: :unprocessable_entity
            else
                begin
                    nama_pengusul = params[:nama_pengusul]
                    spesifikasi_barang = params[:spesifikasi_barang]
                    foto_barang = params[:foto_barang]
                    if params[:nama_pengusul].blank?
                        nama_pengusul = @pengadaan.nama_pengusul
                    end
                    if params[:spesifikasi_barang].blank?
                        spesifikasi_barang = @pengadaan.spesifikasi_barang
                    end
                    if params[:foto_barang].blank?
                        foto_barang = @pengadaan.foto_barang
                    end
                    @pengadaan.assign_attributes({
                        nama_pengusul: nama_pengusul,
                        spesifikasi_barang: spesifikasi_barang,
                        foto_barang: foto_barang
                    })

                    @barang = Barang::Kibb.pengadaan.where(user_pengadaan_id: params[:id]).first
                    nama_ruangan = params[:nama_ruangan]
                    kode_lokasi = params[:kode_lokasi]
                    kode_barang = params[:kode_barang]
                    nama_barang = params[:nama_barang]
                    nomor_register = params[:nomor_register]
                    tipe_barang = params[:tipe_barang]
                    ukuran_barang = params[:ukuran_barang]
                    bahan_barang = params[:bahan_barang]
                    tahun_pembelian = params[:tahun_pembelian]
                    nomor_pabrik = params[:nomor_pabrik]
                    nomor_rangka = params[:nomor_rangka]
                    nomor_mesin = params[:nomor_mesin]
                    nomor_polisi = params[:nomor_polisi]
                    nomor_bpkb = params[:nomor_bpkb]
                    asal_usul = params[:asal_usul]
                    harga_barang = params[:harga_barang]
                    keterangan = params[:keterangan]
                    if nama_ruangan[:nama_ruangan].blank?
                        nama_ruangan = @barang.nama_ruangan
                    end
                    if params[:kode_barang].blank?
                        kode_barang = @barang.kode_barang
                    end
                    if params[:kode_lokasi].blank? 
                        kode_lokasi = @barang.kode_lokasi
                    end
                    if params[:nama_barang].blank?
                        nama_barang = @barang.nama_barang
                    end
                    if params[:nomor_register].blank? or params[:nomor_register] == @barang.nomor_register
                        nomor_register = @barang.nomor_register
                    else
                        is_trigger = true
                        nomor_registered = Barang::Kibb.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
                        if nomor_registered.present?
                            render json: {
                                response_code: 422, 
                                response_message: "Nomor register tidak boleh sama!"
                                }, status: :unprocessable_entity
                            is_trigger = false
                        end
                    end
                    if params[:tipe_barang].blank?
                        tipe_barang = @barang.tipe_barang
                    end
                    if params[:ukuran_barang].blank?
                        ukuran_barang = @barang.ukuran_barang
                    end
                    if params[:bahan_barang].blank?
                        bahan_barang = @barang.bahan_barang
                    end
                    if params[:tahun_pembelian].blank? 
                        tahun_pembelian = @barang.tahun_pembelian
                    end
                    if params[:nomor_pabrik].blank?
                        nomor_pabrik = @barang.nomor_pabrik
                    end
                    if params[:nomor_rangka].blank?
                        nomor_rangka = @barang.nomor_rangka
                    end
                    if params[:nomor_mesin].blank?
                        nomor_mesin = @barang.nomor_mesin
                    end
                    if params[:nomor_polisi].blank?
                        nomor_polisi = @barang.nomor_polisi
                    end
                    if params[:nomor_bpkb].blank?
                        nomor_bpkb = @barang.nomor_bpkb
                    end
                    if params[:asal_usul].blank?
                        asal_usul = @barang.asal_usul
                    end
                    if params[:harga_barang].blank?
                        harga_barang = @barang.harga_barang
                    end
                    if params[:keterangan].blank?
                        keterangan = @barang.keterangan
                    end
                    @barang.assign_attributes({
                        nama_ruangan: nama_ruangan,
                        kode_barang: kode_barang,
                        kode_lokasi: kode_lokasi, 
                        nama_barang: nama_barang, 
                        nomor_register: nomor_register,
                        tipe_barang: tipe_barang, 
                        ukuran_barang: ukuran_barang,
                        bahan_barang: bahan_barang, 
                        tahun_pembelian: tahun_pembelian, 
                        nomor_pabrik: nomor_pabrik, 
                        nomor_rangka: nomor_rangka, 
                        nomor_mesin: nomor_mesin, 
                        nomor_polisi: nomor_polisi, 
                        nomor_bpkb: nomor_bpkb,
                        asal_usul: asal_usul, 
                        harga_barang: harga_barang, 
                        keterangan: keterangan})
                    if @barang.save(:validate => false) and @pengadaan.save(:validate => false)
                        render json: {
                            response_code: 200,
                            response_message: "Success",
                            data: {pengadaan: @pengadaan, barang: @barang}
                        }
                    else
                        render json: {
                            response_code: 422, 
                            response_message: "Edit gagal!, silahkan di coba kembali"
                            }, status: :unprocessable_entity
                    end

                rescue Exception => e
                    render json: {
                        response_code: 422, 
                        response_message: "edit gagal #{e}"
                        }, status: :unprocessable_entity
                end
                
            end
        end
    end

    def delete
        if params[:id].blank?
            render json: {
                response_code: 422, 
                response_message: "id tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            barang = Barang::Kibb.pengadaan.where(:user_pengadaan_id => params[:id]).first
            pengadaan = User::Pengadaan.new_pengadaan.where(:_id => params[:id]).first
            if not pengadaan.present?
                render json: {
                    response_code: 422, 
                    response_message: "Id tidak dapat ditemukan atau pengadaan sudah dilakukan approval!"
                    }, status: :unprocessable_entity
            else
                if pengadaan.destroy and barang.destroy
                    render json: {
                        response_code: 200, 
                        response_message: "Success"
                        }, status: :ok
                else
                    render json: {
                        response_code: 422, 
                        response_message: "Delete gagal!, silahkan di coba kembali"
                        }, status: :unprocessable_entity
                end
            end
        end
    end

    def index
        barang = Barang::Kibb.pengadaan.where(:user_pengadaan_id.in => User::Pengadaan.new_pengadaan.pluck(:id))
        pengadaan = User::Pengadaan.new_pengadaan.where(:_id.in => Barang::Kibb.pengadaan.pluck(:user_pengadaan_id))
        if pengadaan.present?
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {pengadaan: pengadaan, barang: barang}
                }, status: :ok
        else
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        end
    end

    def search
        @pengadaan = User::Pengadaan.new_pengadaan.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        if not @barang.present? and not @pengadaan.present?
            render json: {
                response_code: 422, 
                response_message: "Keyword tidak dapat ditemukan!"
                }, status: :unprocessable_entity
        elsif @pengadaan.present?
            barang = Barang::Kibb.pengadaan.where(:user_pengadaan_id.in => @pengadaan.pluck(:id))
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: barang, pengadaan: @pengadaan}
                }, status: :ok
        elsif not @pengadaan.present?
            @barang = Barang::Kibb.pengadaan.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
            pengadaan = User::Pengadaan.new_pengadaan.where(:_id.in => @barang.pluck(:user_pengadaan_id))
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: @barang, pengadaan: pengadaan}
                }, status: :ok
        end
    end
end