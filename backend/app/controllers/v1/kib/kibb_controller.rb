class V1::Kib::KibbController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_b = Barang::Kibb.all
        if not @kib_b.present?
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @kib_b
                }, status: :ok
        end
    end
  
    def create
        if role.match(/Pengguna/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            @kib_b = Barang::Kibb.new(user_params)
            nomor_registered = Barang::Kibb.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
            if nomor_registered.present?
                render json: {
                    response_code: 422,
                    response_message: "Nomor register tidak boleh sama!"
                    }, status: :unprocessable_entity 
            else
                if @kib_b.save
                    render json: {
                        response_code: 201, 
                        response_message: "Success", 
                        data: @kib_b
                        }, status: :created
                else
                    render json: {
                        response_code: 422,
                        response_message: @kib_b.errors.full_messages
                        }, status: :unprocessable_entity
                end
            end
        end
    end

    def edit
        if role.match(/Pengguna/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            if params[:id].blank?
                render json: {
                    response_code: 422, 
                    response_message: "Id tidak boleh kosong!"
                    }, status: :unprocessable_entity
            else 
                kib_validate = Barang::Kibb.where(_id: params[:id]).first
                if not kib_validate.present?
                    render json: {
                        response_code: 422, 
                        response_message: "Id tidak dapat ditemukan!"
                        }, status: :unprocessable_entity
                elsif kib_validate.status_kib == Enums::Kib::DELETED
                    render json: {
                        response_code: 422, 
                        response_message: "Barang sudah dihapus, tidak dapat di Edit!"
                        }, status: :unprocessable_entity
                else
                    begin
                        @kib_b = Barang::Kibb.find(params[:id])
                        kode_barang = params[:kode_barang]
                        kode_lokasi = params[:kode_lokasi]
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
                        if params[:kode_barang].blank?
                            kode_barang = @kib_b.kode_barang
                        end
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_b.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_b.nama_barang
                        end
                        if params[:nomor_register].blank? or params[:nomor_register] == @barang.nomor_register
                            nomor_register = @kib_b.nomor_register
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
                            tipe_barang = @kib_b.tipe_barang
                        end
                        if params[:ukuran_barang].blank?
                            ukuran_barang = @kib_b.ukuran_barang
                        end
                        if params[:bahan_barang].blank?
                            bahan_barang = @kib_b.bahan_barang
                        end
                        if params[:tahun_pembelian].blank? 
                            tahun_pembelian = @kib_b.tahun_pembelian
                        end
                        if params[:nomor_pabrik].blank?
                            nomor_pabrik = @kib_b.nomor_pabrik
                        end
                        if params[:nomor_rangka].blank?
                            nomor_rangka = @kib_b.nomor_rangka
                        end
                        if params[:nomor_mesin].blank?
                            nomor_mesin = @kib_b.nomor_mesin
                        end
                        if params[:nomor_polisi].blank?
                            nomor_polisi = @kib_b.nomor_polisi
                        end
                        if params[:nomor_bpkb].blank?
                            nomor_bpkb = @kib_b.nomor_bpkb
                        end
                        if params[:asal_usul].blank?
                            asal_usul = @kib_b.asal_usul
                        end
                        if params[:harga_barang].blank?
                            harga_barang = @kib_b.harga_barang
                        end
                        if params[:keterangan].blank?
                            keterangan = @kib_b.keterangan
                        end
                        @kib_b.assign_attributes({
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
                            harga_barang: harga_barang, keterangan: keterangan})
                        if is_trigger == true
                            if @kib_b.save
                                render json: {
                                    response_code: 200, 
                                    response_message: "Success", 
                                    data: @kib_b
                                    }, status: :ok
                            else
                                render json: {
                                    response_code: 422, 
                                    response_message: "Edit gagal!, #{@kib_b.errors.full_messages}"
                                    }, status: :unprocessable_entity
                            end
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
    end
    
    def delete
        if role.match(/Pengguna/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            if params[:id].blank?
                render json: {
                    response_code: 422, 
                    response_message: "Id tidak boleh kosong!"
                    }, status: :unprocessable_entity
            else
                if @kib_b = Barang::Kibb.find(_id: params[:id]).status_kib == Enums::KibStatus::DELETED
                    render json: {
                        response_code: 422, 
                        response_message: "Barang sudah dihapus!"
                        }, status: :unprocessable_entity
                else
                    @kib_b = Barang::Kibb.undeleted.where(_id: params[:id])
                    if not @kib_b.present?
                        render json: {
                            response_code: 422, 
                            response_message: "Id tidak dapat ditemukan!"
                            }, status: :unprocessable_entity
                    else
                        @kib_b.assign_attributes({status_kib: Enums::Kib::DELETED})
                        @kib_b.save(:validate => false)
                        render json: {
                            response_code: 200, 
                            response_message: "Success",
                            data: @kib_b
                            }, status: :ok
                    end
                end
            end
        end
    end
    
    def search_riwayat
        @search = Barang::Kibb.deleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        if not @search.present?
            render json: {
                response_code: 422, 
                response_message: "Keyword tidak dapat ditemukan!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @search
                }, status: :ok
        end
    end

    def search
        @search = Barang::Kibb.undeleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        if not @search.present?
            render json: {
                response_code: 422, 
                response_message: "Keyword tidak dapat ditemukan!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @search
                }, status: :ok
        end
    end
  
    private

    def user_params
        params.permit(:nama_ruangan, :kode_barang, :kode_lokasi, :nama_barang, :nomor_register, :ukuran_barang, :tipe_barang, :bahan_barang, 
            :tahun_pembelian, :nomor_pabrik, :nomor_rangka, :nomor_mesin, :nomor_polisi, :nomor_bpkb, :asal_usul, :harga_barang, :keterangan)
    end
end