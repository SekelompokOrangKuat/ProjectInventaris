class V1::User::JadwalController < ApplicationController
    before_action :authorize_request
    
    def index
        @jadwal = User::Jadwal.all
        if not @jadwal.present?
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @jadwal
                }, status: :ok
        end
    end
  
    def create
        if params[:tanggal].blank?
            render json: {
                response_code: 422,
                response_message: "tanggal tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            tanggal = DateTime.parse("#{params[:tanggal]}")
            triwulan = (((tanggal.month - 1) / 3) + 1).to_i
            semester = (((tanggal.month - 1) / 6) + 1).to_i
            bulan = tanggal.strftime("%B")
            if bulan == "January"
                bulan = "Januari"
            elsif bulan == "Febuary"
                bulan = "Febuari"
            elsif bulan == "March"
                bulan = "Maret"
            elsif bulan == "May"
                bulan = "Mei"
            elsif bulan == "June"
                bulan = "Juni"
            elsif bulan == "July"
                bulan = "Juli"
            elsif bulan == "August"
                bulan = "Agustus"
            elsif bulan == "October"
                bulan = "Oktober"
            elsif bulan == "December"
                bulan = "Desember"
            end
            @jadwal = User::Jadwal.new(
                tanggal: "#{tanggal.day} #{bulan} #{tanggal.year}",
                triwulan: triwulan,
                semester: semester,
                keterangan: params[:keterangan])
            if @jadwal.save
                render json: {
                    response_code: 201, 
                    response_message: "Success", 
                    data: @jadwal
                    }, status: :created
            else
                render json: {
                    response_code: 422,
                    response_message: @jadwal.errors.full_messages
                    }, status: :unprocessable_entity
            end
        end
    end
  
    def edit
        if params[:id].blank?
            render json: {
                response_code: 422, 
                response_message: "Id tidak boleh kosong!"
                }, status: :unprocessable_entity
        else 
            jadwal_validate = User::Jadwal.where(_id: params[:id]).first
            if not jadwal_validate.present?
                render json: {
                    response_code: 422, 
                    response_message: "Jadwal tidak dapat ditemukan!"
                    }, status: :unprocessable_entity
            elsif jadwal_validate.status_jadwal == Enums::Status::DELETED
                render json: {
                    response_code: 422, 
                    response_message: "Jadwal sudah dihapus, tidak dapat di Edit!"
                    }, status: :unprocessable_entity
            else
                begin
                    @jadwal = User::Jadwal.find(params[:id])
                    keterangan = params[:keterangan]
                    if params[:tanggal].blank?
                        tanggal = @jadwal.tanggal
                        triwulan = @jadwal.triwulan
                        semester = @jadwal.semester
                    else
                        date = DateTime.parse("#{params[:tanggal]}")
                        triwulan = (((date.month - 1) / 3) + 1).to_i
                        semester = (((date.month - 1) / 6) + 1).to_i
                        bulan = date.strftime("%B")
                        if bulan == "January"
                            bulan = "Januari"
                        elsif bulan == "Febuary"
                            bulan = "Febuari"
                        elsif bulan == "March"
                            bulan = "Maret"
                        elsif bulan == "May"
                            bulan = "Mei"
                        elsif bulan == "June"
                            bulan = "Juni"
                        elsif bulan == "July"
                            bulan = "Juli"
                        elsif bulan == "August"
                            bulan = "Agustus"
                        elsif bulan == "October"
                            bulan = "Oktober"
                        elsif bulan == "December"
                            bulan = "Desember"
                        end
                        tanggal = "#{date.day} #{bulan} #{date.year}"
                    end
                    if params[:keterangan].blank?
                        keterangan = @jadwal.keterangan
                    end
                    @jadwal.assign_attributes({
                        tanggal: tanggal, 
                        triwulan: triwulan,
                        semester: semester,
                        keterangan: keterangan})
                    if @jadwal.save(:validate => false)
                        render json: {
                            response_code: 200, 
                            response_message: "Success", 
                            data: @jadwal
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
                        response_message: "edit gagal, tanggal is invalid"
                        }, status: :unprocessable_entity
                end
            end
        end
    end
    
    def delete
        if params[:id].blank?
            render json: {
                response_code: 422, 
                response_message: "Id tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            if @jadwal = User::Jadwal.find(params[:id]).status_jadwal == Enums::Status::DELETED
                render json: {
                    response_code: 422, 
                    response_message: "Jadwal sudah dihapus!"
                    }, status: :unprocessable_entity
            else
                @jadwal = User::Jadwal.undeleted.where(_id: params[:id])
                if not @jadwal.present?
                    render json: {
                        response_code: 422, 
                        response_message: "Id tidak dapat ditemukan!"
                        }, status: :unprocessable_entity
                else
                    @jadwal.assign_attributes({status_jadwal: Enums::Status::DELETED})
                    @jadwal.save(:validate => false)
                    render json: {
                        response_code: 200, 
                        response_message: "Success",
                        data: @jadwal
                        }, status: :ok
                end
            end
        end
    end

    def search_riwayat
        @search= User::Jadwal.deleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
        @search= User::Jadwal.undeleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
end