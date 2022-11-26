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
    
end