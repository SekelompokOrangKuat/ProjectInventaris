class V1::Ruangan::RuangansController < ApplicationController

  def getAll
    @ruangans = Ruangan.all
    render json: @ruangans, status: :ok
  end

  def editById
    if params[:_id].blank?
      render json: { error: "ID tidak boleh kosong!"}, status: :unprocessable_entity
    else
      ruangan = Ruangan.where(_id: params[:_id]).first
      if not ruangan.present?
        render json: { error: "Ruangan tidak terdaftar!"}, status: :unprocessable_entity
      else
        begin
          @ruangans = Ruangan.find(params[:_id])
          if params[:nama_ruangan].blank?
            nama_ruangan = ruangan.nama_ruangan
          else
            nama_ruangan = params[:nama_ruangan]
          end
          if params[:bidang_ruangan].blank?
            bidang_ruangan = ruangan.bidang_ruangan
          else
            bidang_ruangan = params[:bidang_ruangan]
          end
          if params[:kelompok_ruangan].blank?
            kelompok_ruangan = ruangan.kelompok_ruangan
          else
            kelompok_ruangan = params[:kelompok_ruangan]
          end
          @ruangans.assign_attributes({nama_ruangan: nama_ruangan, bidang_ruangan: bidang_ruangan, kelompok_ruangan: kelompok_ruangan})
          @ruangans.save(:validate => false)
          render json: { success: @ruangans }, status: :ok
        rescue Exception => e
          render json: { error: "Edit gagal, silahkan coba kembali!"}, status: :unprocessable_entity
        end
      end
    end
  end

  def create
    ruangan = Ruangan.new(ruangan_params)
    if ruangan.save
      render json: ruangan, status: :created
    else 
      render json: { errors: @ruangan.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if params[:_id].blank?
      render json: {error: "ID harus di isi!"}, status: :unprocessable_entity
    else
      @ruangans = Ruangan.where(_id: params[:_id])
      if not @ruangans.present?
        render json: { error: "Ruangan tidak terdaftar!" }, status: :unprocessable_entity
      else
        @ruangans.destroy
        render json: { success: "Ruangan berhasil dihapus!" }, status: :ok
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ruangan
      @ruangan = Ruangan.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def ruangan_params
      params.permit(:nama_ruangan, :bidang_ruangan, :kelompok_ruangan, :id)
    end
end
