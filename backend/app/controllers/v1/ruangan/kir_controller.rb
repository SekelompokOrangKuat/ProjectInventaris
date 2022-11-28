class V1::Ruangan::KirController < ApplicationController
    before_action :authorize_request
  
    def getByRuangan
        @kib_b = Barang::Kibb.undeleted.where(nama_ruangan: params[:nama_ruangan])
        if not @kib_b.present?
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {nama_ruangan: "#{params[:nama_ruangan]}", kib: @kib_b}
                }, status: :ok
        end
    end
    
    def search_kir
        @barang = Barang::Kibb.undeleted.where(nama_ruangan: params[:nama_ruangan]).select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        if @barang.present?
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: @barang}
                }, status: :ok
        else
            render json: {
                response_code: 422, 
                response_message: "Keyword tidak dapat ditemukan!"
                }, status: :unprocessable_entity
        end
    end
end