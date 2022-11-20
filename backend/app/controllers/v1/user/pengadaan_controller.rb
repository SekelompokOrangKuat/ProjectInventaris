class V1::User::PengadaanController < ApplicationController
    before_action :authorize_request
    
    def create
        if params[:nama_pengusul].blank?
            render json: {
                response_code: 422, 
                response_message: "Nama Pengusul tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            barang = Barang::Kibb.create(kode_lokasi: params[:kode_lokasi],
                                            nama_barang: params[:nama_barang],
                                            nomor_register: params[:nomor_register],
                                            tipe_barang: params[:tipe_barang],
                                            bahan_barang: params[:bahan_barang],
                                            tahun_pembelian: params[:tahun_pembelian],
                                            nomor_pabrik: params[:nomor_pabrik],
                                            nomor_rangka: params[:nomor_rangka],
                                            nomor_mesin: params[:nomor_mesin],
                                            nomor_polisi: params[:nomor_polisi],
                                            asal_usul: params[:asal_usul],
                                            harga_barang: params[:harga_barang],
                                            keterangan: params[:keterangan],
                                            user_pengadaan: User::Pengadaan.create(nama_pengusul: params[:nama_pengusul], 
                                                foto_barang: params[:foto_barang]))
            if barang.save
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
                @approval_pengadaan = User::Pengadaan.find(params[:id])
                @kibb = Barang::Kibb.where(user_pengadaan_id: params[:id])
                if @approval_pengadaan.present? 
                    if params[:is_approve].blank?
                        render json: {
                            response_code: 422, 
                            response_message: "is_approve tidak boleh kosong!"
                            }, status: :unprocessable_entity
                    else
                        if params[:is_approve] == true
                            @approval_pengadaan.assign_attributes({status_usulan: Enums::KibStatus::ACCEPTED})
                            @approval_pengadaan.save!(:validate => false)
                            @kibb.assign_attributes({status_kib: Enums::Kib::NEW})
                            @kibb.save!(:validate => false)
                            render json: {
                                response_code: 200, 
                                response_message: "Success", 
                                data: @approval_pengadaan
                                }, status: :ok
                        else
                            @approval_pengadaan.assign_attributes({status_usulan: Enums::KibStatus::REJECTED})
                            @approval_pengadaan.save!(:validate => false)
                            render json: {
                                response_code: 200, 
                                response_message: "Success", 
                                data: @approval_pengadaan
                                }, status: :ok
                        end
                    end
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
            @pengadaan = User::Pengadaan.new_pengusulan.find(params[:id])
            if not @pengadaan.present?
                render json: {
                    response_code: 422, 
                    response_message: "Id tidak dapat ditemukan atau pengadaan sudah dilakukan approval!"
                    }, status: :unprocessable_entity
            else
                begin
                    nama_pengusul = params[:nama_pengusul]
                    foto_barang = params[:foto_barang]
                    if params[:nama_pengusul].blank?
                        nama_pengusul = @pengadaan.nama_pengusul
                    end
                    if params[:foto_barang].blank?
                        foto_barang = @pengadaan.foto_barang
                    end
                    @pengadaan.assign_attributes({
                        nama_pengusul: nama_pengusul,
                        foto_barang: foto_barang
                    })

                    @barang = Barang::Kibb.pengadaan.where(user_pengadaan_id: params[:id]).first
                    kode_lokasi = params[:kode_lokasi]
                    nama_barang = params[:nama_barang]
                    nomor_register = params[:nomor_register]
                    tipe_barang = params[:tipe_barang]
                    bahan_barang = params[:bahan_barang]
                    tahun_pembelian = params[:tahun_pembelian]
                    nomor_pabrik = params[:nomor_pabrik]
                    nomor_rangka = params[:nomor_rangka]
                    nomor_mesin = params[:nomor_mesin]
                    nomor_polisi = params[:nomor_polisi]
                    asal_usul = params[:asal_usul]
                    harga_barang = params[:harga_barang]
                    keterangan = params[:keterangan]
                    if params[:kode_lokasi].blank? 
                        kode_lokasi = @barang.kode_lokasi
                    end
                    if params[:nama_barang].blank?
                        nama_barang = @barang.nama_barang
                    end
                    if params[:nomor_register].blank?
                        nomor_register = @barang.nomor_register
                    end
                    if params[:tipe_barang].blank?
                        tipe_barang = @barang.tipe_barang
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
                        kode_lokasi: kode_lokasi, 
                        nama_barang: nama_barang, 
                        nomor_register: nomor_register,
                        tipe_barang: tipe_barang, 
                        bahan_barang: bahan_barang, 
                        tahun_pembelian: tahun_pembelian, 
                        nomor_pabrik: nomor_pabrik, 
                        nomor_rangka: nomor_rangka, 
                        nomor_mesin: nomor_mesin, 
                        nomor_polisi: nomor_polisi, 
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
            pengadaan = User::Pengadaan.new_pengusulan.where(:_id => params[:id]).first
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
        barang = Barang::Kibb.pengadaan.where(:user_pengadaan_id.in => User::Pengadaan.new_pengusulan.pluck(:id))
        pengadaan = User::Pengadaan.new_pengusulan.where(:_id.in => Barang::Kibb.pengadaan.pluck(:user_pengadaan_id))
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
        @barang = Barang::Kibb.pengadaan.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        @pengadaan = User::Pengadaan.new_pengusulan.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        if not @barang.present? and not @pengadaan.present?
            render json: {
                response_code: 422, 
                response_message: "Keyword tidak dapat ditemukan!"
                }, status: :unprocessable_entity
        elsif params[:keywords].blank?
            render json: {
                response_code: 422, 
                response_message: "keywords tidak boleh kosong!"
                }, status: :unprocessable_entity
        elsif @pengadaan.present? and not @barang.present?
            barang = Barang::Kibb.pengadaan.where(:user_pengadaan_id.in => @pengadaan.pluck(:id))
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: barang, pengadaan: @pengadaan}
                }, status: :ok
        elsif @barang.present? and not @pengadaan.present?
            pengadaan = User::Pengadaan.new_pengusulan.where(:_id.in => @barang.pluck(:user_pengadaan_id))
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: @barang, pengadaan: pengadaan}
                }, status: :ok
        end
    end
end