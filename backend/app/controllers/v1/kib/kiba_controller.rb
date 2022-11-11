class V1::Kib::KibaController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_a = Barang::Kiba.all.undeleted
        if not @kib_a.present?
            render json: {error: "Tidak ada data!"}, status: :unprocessable_entity
        else
            render json: @kib_a, status: :ok
        end
    end
  
    def find
        if params[:id].blank?
            render json: {error: "id tidak boleh kosong!"}, status: :unprocessable_entity
        else
            kib_a = Barang::Kiba.where(_id: params[:id]).first
            if not kib_a.present?
                render json: {error: "Barang tidak dapat ditemukan!"}, status: :unprocessable_entity
            elsif kib_a.status_kib == Enums::KibStatus::DELETED
                render json: {error: "Barang sudah dihapus!"}, status: :unprocessable_entity  
            else
                render json: {success: kib_a}, status: :ok
            end
        end
    end
  
    def create
        @kib_a = Barang::Kiba.new(user_params)
        if @kib_a.save
            render json: @kib_a, status: :created
        else
            render json: { errors: @kib_a.errors.full_messages }, status: :unprocessable_entity
        end
    end
  
    def edit
        if params[:id].blank?
            render json: {error: "Id tidak boleh kosong!"}, status: :unprocessable_entity
        else 
            kib_validate = Barang::Kiba.where(_id: params[:id]).first
            if not kib_validate.present?
                render json: {error: "Id tidak dapat ditemukan!"}, status: :unprocessable_entity
            elsif kib_validate.status_kib == Enums::KibStatus::DELETED
                render json: {error: "Barang sudah dihapus, tidak dapat di Edit!"}, status: :unprocessable_entity
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
                    @kib_a.assign_attributes({kode_lokasi: kode_lokasi, nama_barang: nama_barang, nomor_register: nomor_register,
                        luas: luas, tahun_pengadaan: tahun_pengadaan, alamat: alamat, kota: kota, status_tanah: status_tanah, 
                        nomor_sertifikat: nomor_sertifikat, penggunaan: penggunaan, asal_usul: asal_usul,
                        nilai_perolehan: nilai_perolehan, keterangan: keterangan})
                    @kib_a.save(:validate => false)
                    render json: {succes: @kib_a}, status: :ok                
                rescue Exception => e
                    render json: {error: "edit gagal #{e}"}, status: :unprocessable_entity
                end
            end
        end
    end
    
    def delete
        if params[:id].blank?
            render json: {error: "Id tidak boleh kosong!"}, status: :unprocessable_entity
        else
            @kib_a = Barang::Kiba.find(params[:id])
            if not @kib_a.present?
                render json: {error: "Id tidak dapat ditemukan!"}, status: :unprocessable_entity
            else
                @kib_a.assign_attributes({status_kib: Enums::KibStatus::DELETED})
                @kib_a.save(:validate => false)
                render json: {success: @kib_a}, status: :ok
            end
        end
    end
  
    private

    def user_params
        params.permit(:kode_lokasi, :nama_barang, :nomor_register, :luas, :tahun_pengadaan, :alamat, :kota, :status_tanah, 
            :nomor_sertifikat, :penggunaan, :asal_usul, :nilai_perolehan, :keterangan).merge!({status_kib: Enums::KibStatus::NEW})
    end
end