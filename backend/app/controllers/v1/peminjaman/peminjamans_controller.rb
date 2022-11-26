class V1::Peminjaman::PeminjamansController < ApplicationController

    def getAll
      @peminjamans = Peminjaman.all
      render json: @peminjamans, status: :ok
    end

    def getPeminjaman
      barang = Barang::Kibb.peminjaman.where(:peminjaman_id.in => Peminjaman.borrowed.pluck(:id))
      peminjaman = Peminjaman.borrowed.where(:_id.in => Barang::Kibb.peminjaman.pluck(:peminjaman_id))
      if not peminjaman.present?
        render json: {
          response_code: 422,
          response_message: "Tidak ada data"
        }, status: :unprocessable_entity
      else
        render json: {
          response_code: 200,
          response_message: "Success",
          data: {peminjaman: peminjaman, barang: barang}
        }, status: :ok
      end
    end

    def editById
      if params[:_id].blank?
        render json: { error: "ID tidak boleh kosong!"}, status: :unprocessable_entity
      else
        peminjaman = Peminjaman.where(_id: params[:_id]).first
        if not peminjaman.present?
          render json: { error: "Data peminjaman tidak terdaftar!"}, status: :unprocessable_entity
        else
          begin
            @peminjaman = Peminjaman.find(params[:_id])
            if params[:tanggal_peminjaman].blank?
              tanggal_peminjaman = peminjaman.tanggal_peminjaman
            else
              tanggal_peminjaman = params[:tanggal_peminjaman]
            end
            if params[:tanggal_pengembalian].blank?
              tanggal_pengembalian = peminjaman.tanggal_pengembalian
            else
              tanggal_pengembalian = params[:tanggal_pengembalian]
            end
            @peminjaman.assign_attributes({tanggal_peminjaman: tanggal_peminjaman, tanggal_pengembalian: tanggal_pengembalian})
            @peminjaman.save(:validate => false)
            render json: { success: @peminjaman }, status: :ok
          rescue Exception => e
            render json: { error: "Edit gagal, silahkan coba kembali!"}, status: :unprocessable_entity
          end
        end
      end
    end
  
    def create
      @barang = Barang::Kibb.undeleted.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
      if @barang.present?
        @barang.assign_attributes({status_kib: Enums::Kib::PEMINJAMAN})
        @peminjaman = Peminjaman.pending.find(@barang.peminjaman_id)
        @peminjaman.assign_attributes({
          tanggal_peminjaman: params[:tanggal_peminjaman],
          tanggal_pengembalian: params[:tanggal_pengembalian],
          status_peminjaman: Enums::StatusPeminjaman::BORROWED
          })
        if @barang.save(:validate => false) and @peminjaman.save(:validate => false) 
          render json: {barang: @barang, peminjaman: @peminjaman}, status: :ok
        else 
          render json: { errors_barang: @barang.errors.full_messages, errors_peminjaman: @peminjaman.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Data Barang tidak terdaftar!" }, status: :unprocessable_entity
      end
    end
  
    def destroy
      if params[:_id].blank?
        render json: {error: "ID harus di isi!"}, status: :unprocessable_entity
      else
        @peminjaman = Peminjaman.where(_id: params[:_id])
        if not @peminjaman.present?
          render json: { error: "Data peminjaman tidak terdaftar!" }, status: :unprocessable_entity
        else
          @peminjaman.destroy
          render json: { success: "Data peminjaman berhasil dihapus!" }, status: :ok
        end
      end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_peminjaman
        @peminjaman = Peminjaman.find(params[:id])
      end
  
      # Only allow a list  of trusted parameters through.
      def peminjaman_params
        params.permit(:tanggal_peminjaman, :tanggal_pengembalian, :id)
      end
  end
  