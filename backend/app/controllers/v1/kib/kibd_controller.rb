class V1::Kib::KibdController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_d = Barang::Kibd.all.undeleted
        if not @kib_d.present?
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @kib_d
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
            @kib_d = Barang::Kibd.new(user_params)
            if @kib_d.save
                render json: {
                    response_code: 201, 
                    response_message: "Success", 
                    data: @kib_d
                    }, status: :created
            else
                render json: {
                    response_code: 422,
                    response_message: @kib_d.errors.full_messages
                    }, status: :unprocessable_entity
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
                kib_validate = Barang::Kibd.where(_id: params[:id]).first
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
                        @kib_d = Barang::Kibd.find(params[:id])
                        kode_lokasi = params[:kode_lokasi]
                        nama_barang = params[:nama_barang]
                        nomor_register = params[:nomor_register]
                        konstruksi = params[:konstruksi]
                        panjang = params[:panjang]
                        lebar = params[:lebar]
                        luas = params[:luas]
                        nomor_dokumen = params[:nomor_dokumen]
                        tanggal_dokumen = params[:tanggal_dokumen]
                        status = params[:status]
                        nomor_tanah = params[:nomor_tanah]
                        asal_usul = params[:asal_usul]
                        harga = params[:harga]
                        kondisi = params[:kondisi]
                        keterangan = params[:keterangan]
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_d.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_d.nama_barang
                        end
                        if params[:nomor_register].blank?
                            nomor_register = @kib_d.nomor_register
                        end
                        if params[:konstruksi].blank?
                            konstruksi = @kib_d.konstruksi
                        end
                        if params[:panjang].blank? 
                            panjang = @kib_d.panjang
                        end
                        if params[:lebar].blank?
                            lebar = @kib_d.lebar
                        end
                        if params[:luas].blank?
                            luas = @kib_d.luas
                        end
                        if params[:nomor_dokumen].blank?
                            nomor_dokumen = @kib_d.nomor_dokumen
                        end
                        if params[:tanggal_dokumen].blank?
                             tanggal_dokumen = @kib_d.tanggal_dokumen
                        end
                        if params[:status].blank?
                            status = @kib_d.status
                        end
                        if params[:asal_usul].blank?
                            asal_usul = @kib_d.asal_usul
                        end
                        if params[:harga].blank?
                            harga = @kib_d.harga
                        end
                        if params[:kondisi].blank?
                            kondisi = @kib_d.kondisi
                        end
                        if params[:keterangan].blank?
                            keterangan = @kib_d.keterangan
                        end
                        @kib_d.assign_attributes({
                            kode_lokasi: kode_lokasi, 
                            nama_barang: nama_barang, 
                            nomor_register: nomor_register,
                            konstruksi: konstruksi, 
                            panjang: panjang, 
                            lebar: lebar, 
                            luas: luas, 
                            nomor_dokumen: nomor_dokumen, 
                            tanggal_dokumen: tanggal_dokumen, 
                            status: status,
                            asal_usul: asal_usul, 
                            harga: harga, 
                            kondisi: kondisi,
                            keterangan: keterangan})
                        if @kib_d.save(:validate => false)
                            render json: {
                                response_code: 200, 
                                response_message: "Success", 
                                data: @kib_d
                                }, status: :ok
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
                if @kib_d = Barang::Kibd.find(_id: params[:id]).status_kib == Enums::KibStatus::DELETED
                    render json: {
                        response_code: 422, 
                        response_message: "Barang sudah dihapus!"
                        }, status: :unprocessable_entity
                else
                    @kib_d = Barang::Kibf.undeleted.where(_id: params[:id])
                    if not @kib_d.present?
                        render json: {
                            response_code: 422, 
                            response_message: "Id tidak dapat ditemukan!"
                            }, status: :unprocessable_entity
                    else
                        @kib_d.assign_attributes({status_kib: Enums::Kib::DELETED})
                        @kib_d.save(:validate => false)
                        render json: {
                            response_code: 200, 
                            response_message: "Success",
                            data: @kib_d
                            }, status: :ok
                    end
                end
            end
        end
    end

    def search
        @search = Barang::Kibd.all.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
        params.permit(:kode_lokasi, :nama_barang, :nomor_register, :konstruksi, :panjang, :lebar, :luas, :nomor_dokumen, 
            :tanggal_dokumen, :status, :nomor_tanah, :asal_usul, :harga, :kondisi, 
            :keterangan)
    end
end