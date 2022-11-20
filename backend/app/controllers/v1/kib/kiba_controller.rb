class V1::Kib::KibaController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_a = Barang::Kiba.all.undeleted
        if not @kib_a.present?
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @kib_a
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
            @kib_a = Barang::Kiba.new(user_params)
            if @kib_a.save
                render json: {
                    response_code: 201, 
                    response_message: "Success", 
                    data: @kib_a
                    }, status: :created
            else
                render json: {
                    response_code: 422,
                    response_message: @kib_a.errors.full_messages
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
                kib_validate = Barang::Kiba.where(_id: params[:id]).first
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
                        @kib_a = Barang::Kiba.find(params[:id])
                        kode_lokasi = params[:kode_lokasi]
                        nama_barang = params[:nama_barang]
                        nomor_register = params[:nomor_register]
                        luas = params[:luas]
                        tahun_pengadaan = params[:tahun_pengadaan]
                        alamat = params[:alamat]
                        kota = params[:kota]
                        status_tanah = params[:status_tanah]
                        nomor_sertifikat = params[:nomor_sertifikat]
                        penggunaan = params[:penggunaan]
                        asal_usul = params[:asal_usul]
                        nilai_perolehan = params[:nilai_perolehan]
                        keterangan = params[:keterangan]
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_a.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_a.nama_barang
                        end
                        if params[:nomor_register].blank?
                            nomor_register = @kib_a.nomor_register
                        end
                        if params[:luas].blank?
                            luas = @kib_a.luas
                        end
                        if params[:tahun_pengadaan].blank? 
                            tahun_pengadaan = @kib_a.tahun_pengadaan
                        end
                        if params[:alamat].blank?
                            alamat = @kib_a.alamat
                        end
                        if params[:kota].blank?
                            kota = @kib_a.kota
                        end
                        if params[:status_tanah].blank?
                            status_tanah = @kib_a.status_tanah
                        end
                        if params[:nomor_sertifikat].blank?
                            nomor_sertifikat = @kib_a.nomor_sertifikat
                        end
                        if params[:penggunaan].blank?
                            penggunaan = @kib_a.penggunaan
                        end
                        if params[:asal_usul].blank?
                            asal_usul = @kib_a.asal_usul
                        end
                        if params[:nilai_perolehan].blank?
                            nilai_perolehan = @kib_a.nilai_perolehan
                        end
                        if params[:keterangan].blank?
                            keterangan = @kib_a.keterangan
                        end
                        @kib_a.assign_attributes({
                            kode_lokasi: kode_lokasi, 
                            nama_barang: nama_barang, 
                            nomor_register: nomor_register,
                            luas: luas, 
                            tahun_pengadaan: tahun_pengadaan, 
                            alamat: alamat, 
                            kota: kota, 
                            status_tanah: status_tanah, 
                            nomor_sertifikat: nomor_sertifikat, 
                            penggunaan: penggunaan, 
                            asal_usul: asal_usul,
                            nilai_perolehan: nilai_perolehan, 
                            keterangan: keterangan})
                        if @kib_a.save(:validate => false)
                            render json: {
                                response_code: 200, 
                                response_message: "Success", 
                                data: @kib_a
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
                if @kib_a = Barang::Kiba.find(_id: params[:id]).status_kib == Enums::KibStatus::DELETED
                    render json: {
                        response_code: 422, 
                        response_message: "Barang sudah dihapus!"
                        }, status: :unprocessable_entity
                else
                    @kib_a = Barang::Kiba.undeleted.where(_id: params[:id])
                    if not @kib_a.present?
                        render json: {
                            response_code: 422, 
                            response_message: "Id tidak dapat ditemukan!"
                            }, status: :unprocessable_entity
                    else
                        @kib_a.assign_attributes({status_kib: Enums::Kib::DELETED})
                        @kib_a.save(:validate => false)
                        render json: {
                            response_code: 200, 
                            response_message: "Success",
                            data: @kib_a
                            }, status: :ok
                    end
                end
            end
        end
    end

    def search
        @search = Barang::Kiba.all.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
        params.permit(:kode_lokasi, :nama_barang, :nomor_register, :luas, :tahun_pengadaan, :alamat, :kota, :status_tanah, 
            :nomor_sertifikat, :penggunaan, :asal_usul, :nilai_perolehan, :keterangan)
    end
end