class V1::Admin::KbController < ApplicationController
    before_action :authorize_request

    #Find All Kode Barang
    def index
        @kode_barang = Admin::Kodebarang.all
        if not @kode_barang.present?
            render json: { 
                response_code: 422,
                response_message: "Tidak ada data!"
            }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200,
                response_message: "Success",
                data: @kode_barang
            }, status: :ok
        end
    end

    #Buat Kode Barang Baru
    def create
        if not role.match(/Admin/).present?
            render json: { 
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: :unauthorized
        else
            @kode_barang = Admin::Kodebarang.new(user_params)
            if @kode_barang.save
                render json: {
                    response_code: 201,
                    response_message: "Success",
                    data: @kode_barang
                }, status: :created
            else
                render json: {
                    response_code: 422,
                    response_message: @kode_barang.errors.full_messages
                }, status: :unprocessable_entity
            end
        end
    end

    #Edit Kode Barang
    def edit
        if not role.match(/Admin/).present?
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
                kb_validate = Admin::Kodebarang.where(_id: params[:id]).first
                if not kb_validate.present?
                    render json: {
                        response_code: 422,
                        response_message: "Id tidak dapat ditemukan!"
                    }, status: :unprocessable_entity
                else
                    begin
                        @kode_barang = Admin::Kodebarang.find(params[:id])
                        golongan = params[:golongan]
                        bidang = params[:bidang]
                        kelompok = params[:kelompok]
                        sub_kelompok = params[:sub_kelompok]
                        sub_sub_kelompok = params[:sub_sub_kelompok]
                        nama_barang = params[:nama_barang]
                        if params[:golongan].blank?
                            golongan = @kode_barang.golongan
                        end
                        if params[:bidang].blank?
                            bidang = @kode_barang.bidang
                        end
                        if params[:kelompok].blank?
                            kelompok = @kode_barang.kelompok
                        end
                        if params[:sub_kelompok].blank?
                            sub_kelompok = @kode_barang.sub_kelompok
                        end
                        if params[:sub_sub_kelompok].blank?
                            sub_sub_kelompok = @kode_barang.sub_sub_kelompok
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kode_barang.nama_barang
                        end
                        @kode_barang.assign_attributes({
                            golongan: golongan,
                            bidang: bidang,
                            kelompok: kelompok,
                            sub_kelompok: sub_kelompok,
                            sub_sub_kelompok: sub_sub_kelompok,
                            nama_barang: nama_barang
                        })
                        if @kode_barang.save(:validate => false)
                            render json: {
                                response_code: 200,
                                response_message: "Success",
                                data: @kode_barang
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

    #Delete Kode Barang
    def delete
        if not role.match(/Admin/).present?
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
                @kode_barang = Admin::Kodebarang.find(params[:id])
                if not @kode_barang.present?
                    render json: {
                        response_code: 422,
                        response_message: "Id tidak dapat ditemukan"
                    }, status: :unprocessable_entity
                else
                    @kode_barang.destroy
                    render json: {
                        response_code: 200,
                        response_message: "Success"
                    }, status: :ok
                end
            end
        end
    end

    #Find One Kode Barang
    def search
        if not role.match(/Admin/).present?
            render json: {
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: unauthorized
        else
            @search = Admin::Kodebarang.all.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
    
    private
    def user_params
        params.permit(:golongan, :bidang, :kelompok, :sub_kelompok, :sub_sub_kelompok, :nama_barang)
    end
end