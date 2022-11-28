class V1::Kib::KibcController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_c = Barang::Kibc.all
        if not @kib_c.present?
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @kib_c
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
            @kib_c = Barang::Kibc.new(user_params)
            nomor_registered = Barang::Kibc.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
            if nomor_registered.present?
                render json: {
                    response_code: 422,
                    response_message: "Nomor register tidak boleh sama!"
                    }, status: :unprocessable_entity 
            else
                if @kib_c.save
                    render json: {
                        response_code: 201, 
                        response_message: "Success", 
                        data: @kib_c
                        }, status: :created
                else
                    render json: {
                        response_code: 422,
                        response_message: @kib_c.errors.full_messages
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
                kib_validate = Barang::Kibc.where(_id: params[:id]).first
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
                        @kib_c = Barang::Kibc.find(params[:id])
                        kode_barang = params[:kode_barang]
                        kode_lokasi = params[:kode_lokasi]
                        nama_barang = params[:nama_barang]
                        nomor_register = params[:nomor_register]
                        kondisi_bangunan = params[:kondisi_bangunan]
                        tingkat_bangunan = params[:tingkat_bangunan]
                        beton_bangunan = params[:beton_bangunan]
                        luas_lantai = params[:luas_lantai]
                        alamat = params[:alamat]
                        nomor_dokumen = params[:tanggal_dokumen]
                        tanggal_dokumen = params[:tanggal_dokumen]
                        luas = params[:luas]
                        status = params[:status]
                        nomor_tanah = params[:nomor_tanah]
                        asal_usul = params[:asal_usul]
                        harga = params[:harga]
                        keterangan = params[:keterangan]
                        if params[:kode_barang].blank?
                            kode_barang = kib_c.kode_barang
                        end
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_c.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_c.nama_barang
                        end
                        if params[:nomor_register].blank? or params[:nomor_register] == @barang.nomor_register
                            nomor_register = @kib_c.nomor_register
                        else
                            is_trigger = true
                            nomor_registered = Barang::Kibc.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
                            if nomor_registered.present?
                                render json: {
                                    response_code: 422, 
                                    response_message: "Nomor register tidak boleh sama!"
                                    }, status: :unprocessable_entity
                                is_trigger = false
                            end
                        end
                        if params[:kondisi_bangunan].blank?
                            kondisi_bangunan = @kib_c.kondisi_bangunan
                        end
                        if params[:tingkat_bangunan].blank? 
                            tingkat_bangunan = @kib_c.tingkat_bangunan
                        end
                        if params[:beton_bangunan].blank?
                            beton_bangunan = @kib_c.beton_bangunan
                        end
                        if params[:luas_lantai].blank?
                            luas_lantai = @kib_c.luas_lantai
                        end
                        if params[:alamat].blank?
                            alamat = @kib_c.alamat
                        end
                        if params[:nomor_dokumen].blank?
                            nomor_dokumen = @kib_c.nomor_dokumen
                        end
                        if params[:tanggal_dokumen].blank?
                            tanggal_dokumen = @kib_c.tanggal_dokumen
                        end
                        if params[:luas].blank?
                            luas = @kib_c.luas
                        end
                        if params[:status].blank?
                            status = @kib_c.status
                        end
                        if params[:asal_usul].blank?
                            asal_usul = @kib_c.asal_usul
                        end
                        if params[:harga].blank?
                            harga = @kib_c.harga
                        end
                        if params[:keterangan].blank?
                            keterangan = @kib_c.keterangan
                        end
                        @kib_c.assign_attributes({
                            kode_barang: kode_barang,
                            kode_lokasi: kode_lokasi, 
                            nama_barang: nama_barang, 
                            nomor_register: nomor_register,
                            kondisi_bangunan: kondisi_bangunan, 
                            tingkat_bangunan: tingkat_bangunan, 
                            beton_bangunan: beton_bangunan, 
                            luas_lantai: luas_lantai, 
                            alamat: alamat, 
                            nomor_dokumen: nomor_dokumen,
                            tanggal_dokumen: tanggal_dokumen,
                            luas: luas, 
                            status: status,
                            asal_usul: asal_usul, 
                            harga: harga, 
                            keterangan: keterangan})
                        if is_trigger == true
                            if @kib_c.save(:validate => false)
                                render json: {
                                    response_code: 200, 
                                    response_message: "Success", 
                                    data: @kib_c
                                    }, status: :ok
                            else
                                render json: {
                                    response_code: 422, 
                                    response_message: "Edit gagal!, silahkan di coba kembali"
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
                if @kib_c = Barang::Kibc.find(_id: params[:id]).status_kib == Enums::KibStatus::DELETED
                    render json: {
                        response_code: 422, 
                        response_message: "Barang sudah dihapus!"
                        }, status: :unprocessable_entity
                else
                    @kib_c = Barang::Kibc.undeleted.where(_id: params[:id])
                    if not @kib_c.present?
                        render json: {
                            response_code: 422, 
                            response_message: "Id tidak dapat ditemukan!"
                            }, status: :unprocessable_entity
                    else
                        @kib_c.assign_attributes({status_kib: Enums::Kib::DELETED})
                        @kib_c.save(:validate => false)
                        render json: {
                            response_code: 200, 
                            response_message: "Success",
                            data: @kib_c
                            }, status: :ok
                    end
                end
            end
        end
    end

    def search_riwayat
        @search = Barang::Kibc.deleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
        @search = Barang::Kibc.undeleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
        params.permit(:kode_barang, :kode_lokasi, :nama_barang, :nomor_register, :kondisi_bangunan, :tingkat_bangunan, :beton_bangunan, 
            :luas_lantai, :alamat, :nomor_dokumen, :tanggal_dokumen, :luas, :status, :nomor_tanah, :asal_usul, :harga, :keterangan)
    end
end