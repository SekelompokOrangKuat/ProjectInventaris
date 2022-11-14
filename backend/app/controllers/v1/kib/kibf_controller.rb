class V1::Kib::KibfController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_f = Barang::Kibf.all.undeleted
        if not @kib_f.present?
            render json: {error: "Tidak ada data!"}, status: :unprocessable_entity
        else
            render json: @kib_f, status: :ok
        end
    end
  
    def find
        if params[:id].blank?
            render json: {error: "id tidak boleh kosong!"}, status: :unprocessable_entity
        else
            kib_f = Barang::Kibf.where(_id: params[:id]).first
            if not kib_f.present?
                render json: {error: "Barang tidak dapat ditemukan!"}, status: :unprocessable_entity
            elsif kib_f.status_kib == Enums::KibStatus::DELETED
                render json: {error: "Barang sudah dihapus!"}, status: :unprocessable_entity  
            else
                render json: {success: kib_f}, status: :ok
            end
        end
    end
  
    def create
        if role.match(/Pengguna/).present?
            render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
        else
            @kib_f = Barang::Kibf.new(user_params)
            if @kib_f.save
                render json: @kib_f, status: :created
            else
                render json: { errors: @kib_f.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end
  
    def edit
        if role.match(/Pengguna/).present?
            render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
        else
            if params[:id].blank?
                render json: {error: "Id tidak boleh kosong!"}, status: :unprocessable_entity
            else 
                kib_validate = Barang::Kibf.where(_id: params[:id]).first
                if not kib_validate.present?
                    render json: {error: "Id tidak dapat ditemukan!"}, status: :unprocessable_entity
                elsif kib_validate.status_kib == Enums::KibStatus::DELETED
                    render json: {error: "Barang sudah dihapus, tidak dapat di Edit!"}, status: :unprocessable_entity
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
                        if params[:nomor_register].blank?
                            nomor_register = @kib_f.nomor_register
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
                        @kib_f.assign_attributes({kode_lokasi: kode_lokasi, nama_barang: nama_barang, nomor_register: nomor_register,
                            bangunan: bangunan, tingkat_bangunan: tingkat_bangunan, beton_bangunan: beton_bangunan, luas: luas, 
                            alamat: alamat, nomor_dokumen: nomor_dokumen, tanggal_dokumen: tanggal_dokumen, tanggal_mulai: tanggal_mulai, 
                            status: status, asal_usul: asal_usul, nilai_kontrak: nilai_kontrak, keterangan: keterangan})
                        @kib_f.save(:validate => false)
                        render json: {succes: @kib_f}, status: :ok                
                    rescue Exception => e
                        render json: {error: "edit gagal #{e}"}, status: :unprocessable_entity
                    end
                end
            end
        end
    end
    
    def delete
        if role.match(/Pengguna/).present?
            render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
        else
            if params[:id].blank?
                render json: {error: "Id harus di isi!"}, status: :unprocessable_entity
            else
                @kib_f = Barang::Kibf.find(params[:id])
                if not @kib_f.present?
                    render json: {error: "Id tidak ada!"}, status: :unprocessable_entity
                else
                    @kib_f.assign_attributes({status_kib: Enums::KibStatus::DELETED})
                    @kib_f.save(:validate => false)
                    render json: {success: @kib_f}, status: :ok
                end
            end
        end
    end
  
    private
  
    def user_params
        params.permit(:kode_lokasi, :nama_barang, :nomor_register, :bangunan, :tingkat_bangunan, :beton_bangunan, 
            :luas, :alamat, :nomor_dokumen, :tanggal_dokumen, :tanggal_mulai, :status, :nomor_tanah, :asal_usul, :nilai_kontrak,
             :keterangan).merge!({status_kib: Enums::KibStatus::NEW})
    end
end