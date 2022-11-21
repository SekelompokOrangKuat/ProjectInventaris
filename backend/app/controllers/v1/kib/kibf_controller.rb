class V1::Kib::KibfController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_f = Barang::Kibf.all.undeleted
        if not @kib_f.present?
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @kib_f
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
            @kib_f = Barang::Kibf.new(user_params)
            if @kib_f.save
                render json: {
                    response_code: 201, 
                    response_message: "Success", 
                    data: @kib_f
                    }, status: :created
            else
                render json: {
                    response_code: 422,
                    response_message: @kib_f.errors.full_messages
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
                kib_validate = Barang::Kibf.where(_id: params[:id]).first
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
                        @kib_f = Barang::Kibf.find(params[:id])
                        kode_lokasi = params[:kode_lokasi]
                        nama_barang = params[:nama_barang]
                        nomor_register = params[:nomor_register]
                        bangunan = params[:bangunan]
                        tingkat_bangunan = params[:tingkat_bangunan]
                        beton_bangunan = params[:beton_bangunan]
                        luas = params[:luas]
                        alamat = params[:alamat]
                        nomor_dokumen = params[:nomor_dokumen]
                        tanggal_dokumen = params[:tanggal_dokumen]
                        tanggal_mulai = params[:tanggal_mulai]
                        status = params[:status]
                        nomor_tanah = params[:nomor_tanah]
                        asal_usul = params[:asal_usul]
                        nilai_kontrak = params[:nilai_kontrak]
                        keterangan = params[:keterangan]
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_f.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_f.nama_barang
                        end
                        if params[:nomor_register].blank? or params[:nomor_register] == @barang.nomor_register
                            nomor_register = @kib_f.nomor_register
                        else
                            is_trigger = true
                            nomor_registered = Barang::Kibf.where(nomor_register: params[:nomor_register]).first
                            if nomor_registered.present?
                                render json: {
                                    response_code: 422, 
                                    response_message: "Nomor register tidak boleh sama!"
                                    }, status: :unprocessable_entity
                                is_trigger = false
                            end
                        end
                        if params[:bangunan].blank?
                            bangunan = @kib_f.bangunan
                        end
                        if params[:tingkat_bangunan].blank? 
                            tingkat_bangunan = @kib_f.tingkat_bangunan
                        end
                        if params[:beton_bangunan].blank?
                            beton_bangunan = @kib_f.beton_bangunan
                        end
                        if params[:luas].blank?
                            luas = @kib_f.luas
                        end
                        if params[:alamat].blank?
                            alamat = @kib_f.alamat
                        end
                        if params[:nomor_dokumen].blank?
                            nomor_dokumen = @kib_f.nomor_dokumen
                        end
                        if params[:tanggal_dokumen].blank?
                            tanggal_dokumen = @kib_f.tanggal_dokumen
                        end
                        if params[:status].blank?
                            status = @kib_f.status
                        end
                        if params[:asal_usul].blank?
                            asal_usul = @kib_f.asal_usul
                        end
                        if params[:nilai_kontrak].blank?
                            nilai_kontrak = @kib_f.nilai_kontrak
                        end
                        if params[:keterangan].blank?
                            keterangan = @kib_f.keterangan
                        end
                        @kib_f.assign_attributes({
                            kode_lokasi: kode_lokasi, 
                            nama_barang: nama_barang, 
                            nomor_register: nomor_register,
                            bangunan: bangunan, 
                            tingkat_bangunan: tingkat_bangunan, 
                            beton_bangunan: beton_bangunan, 
                            luas: luas, 
                            alamat: alamat, 
                            nomor_dokumen: nomor_dokumen, 
                            tanggal_dokumen: tanggal_dokumen, 
                            tanggal_mulai: tanggal_mulai, 
                            status: status, 
                            asal_usul: asal_usul, 
                            nilai_kontrak: nilai_kontrak, 
                            keterangan: keterangan})
                        if is_trigger == true
                            if @kib_f.save(:validate => false)
                                render json: {
                                    response_code: 200, 
                                    response_message: "Success", 
                                    data: @kib_f
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
                if @kib_f = Barang::Kibf.find(_id: params[:id]).status_kib == Enums::KibStatus::DELETED
                    render json: {
                        response_code: 422, 
                        response_message: "Barang sudah dihapus!"
                        }, status: :unprocessable_entity
                else
                    @kib_f = Barang::Kibf.undeleted.where(_id: params[:id])
                    if not @kib_f.present?
                        render json: {
                            response_code: 422, 
                            response_message: "Id tidak dapat ditemukan!"
                            }, status: :unprocessable_entity
                    else
                        @kib_f.assign_attributes({status_kib: Enums::Kib::DELETED})
                        @kib_f.save(:validate => false)
                        render json: {
                            response_code: 200, 
                            response_message: "Success",
                            data: @kib_f
                            }, status: :ok
                    end
                end
            end
        end
    end
    
    def search
        @search = Barang::Kibf.all.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
        params.permit(:kode_lokasi, :nama_barang, :nomor_register, :bangunan, :tingkat_bangunan, :beton_bangunan, 
            :luas, :alamat, :nomor_dokumen, :tanggal_dokumen, :tanggal_mulai, :status, :nomor_tanah, :asal_usul, :nilai_kontrak,
             :keterangan)
    end
end