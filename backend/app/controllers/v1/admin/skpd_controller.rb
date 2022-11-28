class V1::Admin::SkpdController < ApplicationController
    before_action :authorize_request, except: :create

    #Find All SKPD
    def index
        if not role.match(/Admin/).present?
            render json: { 
                response_code: 401,
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            @skpd = Admin::Skpd.all
            if not @skpd.present?
                render json: { 
                    response_code: 422,
                    response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
            else
                render json: {
                    response_code: 200,
                    response_message: "Success",
                    data: @skpd
                }, status: :ok
            end
        end
    end

    #Buat SKPD Baru
    def create
        if not role.match(/Admin/).present?
            render json: { 
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: :unauthorized
        else
            @skpd = Admin::Skpd.new(user_params)
            if @skpd.save
                render json: {
                    response_code: 201,
                    response_message: "Success",
                    data: @skpd
                }, status: :created
            else
                render json: {
                    response_code: 422,
                    response_message: @skpd.errors.full_messages
                }, status: :unprocessable_entity
            end
        end
    end

    #Edit SKPD
    def edit
        if not role.match(/Admin/).present?
            render json: { 
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: :unauthorized
        else
            if params[:nip].blank?
                render json: {
                    response_code: 422,
                    response_message: "NIP tidak boleh kosong!"
                }, status: :unprocessable_entity
            else
                nip = Admin::Skpd.where(nip: params[:nip]).first
                if not nip.present?
                    render json: {
                        response_code: 422,
                        response_message: "NIP tidak terdaftar!"
                    }, status: :unprocessable_entity
                else
                    begin
                        @skpd = Admin::Skpd.where(nip: params[:nip]).first
                        jabatan = params[:jabatan]
                        nama = params[:nama]
                        nip = params[:nip]
                        pangkat = params[:pangkat]
                        provinsi = params[:provinsi]
                        unit = params[:unit]
                        satuan_kerja = params[:satuan_kerja]
                        if params[:jabatan].blank?
                            jabatan = @skpd.jabatan
                        end
                        if params[:nama].blank?
                            nama = @skpd.nama
                        end
                        if params[:nip].blank?
                            nip = @skpd.nip
                        end
                        if params[:pangkat].blank?
                            pangkat = @skpd.pangkat
                        end
                        if params[:provinsi].blank?
                            provinsi = @skpd.provinsi
                        end
                        if params[:unit].blank?
                            unit = @skpd.unit
                        end
                        if params[:satuan_kerja].blank?
                            satuan_kerja = @skpd.satuan_kerja
                        end
                        @skpd.assign_attributes({
                            jabatan: jabatan,
                            nama: nama,
                            nip: nip,
                            pangkat: pangkat,
                            provinsi: provinsi,
                            unit: unit,
                            satuan_kerja: satuan_kerja
                        })
                        if @skpd.save(:validate => false)
                            render json: {
                                response_code: 200,
                                response_message: "Success",
                                data: @skpd
                            }, status: :ok
                        else
                            render json: {
                                response_code: 422,
                                response_message: "Edit gagal!, silahkan dicoba kembali"
                            }, status: :unprocessable_entity
                        end
                    rescue Exception => e
                        render json: {
                            response_code: 422,
                            response_message: "Edit gagal, silahkan dicoba kembali!"
                            }, status: :unprocessable_entity
                    end
                end
            end
        end
    end

    #Delete SKPD
    def delete
        if not role.match(/Admin/).present?
            render json: {
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: :unauthorized
        else
            if params[:nip].blank?
                render json: {
                    response_code: 422,
                    response_message: "NIP tidak boleh kosong!"
                }, status: :unprocessable_entity
            else
                @skpd = Admin::Skpd.where(nip: params[:nip]).first
                if not @skpd.present?
                    render json: {
                        response_code: 422,
                        response_message: "NIP tidak ditemukan!"
                    }, status: :unprocessable_entity
                else
                    @skpd.destroy
                    render json: {
                        response_code: 200,
                        response_message: "Success"
                    }, status: :ok
                end
            end
        end
    end

    #Find One SKPD
    def search
        if not role.match(/Admin/).present?
            render json: {
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: unauthorized
        else
            @search = Admin::Skpd.where(provinsi: params[:provinsi], unit: params[:unit], satuan_kerja: params[:satuan_kerja]).all
            if not @search.present?
                render json: {
                    response_code: 422,
                    response_message: "Tidak ada data SKPD yang ditemukan!"
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

    private
    def user_params
        params.permit(:jabatan, :nama, :nip, :pangkat, :provinsi, :unit, :satuan_kerja)
    end
end