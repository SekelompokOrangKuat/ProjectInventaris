class V1::Kib::KibcController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_c = Barang::Kibc.all.undeleted
        if not @kib_c.present?
            render json: {error: "Tidak ada data!"}, status: :unprocessable_entity
        else
            render json: @kib_c, status: :ok
        end
    end
  
    def create
        if role.match(/Pengguna/).present?
            render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
        else
            @kib_c = Barang::Kibc.new(user_params)
            if @kib_c.save
                render json: @kib_c, status: :created
            else
                render json: { errors: @kib_c.errors.full_messages }, status: :unprocessable_entity
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
                kib_validate = Barang::Kibc.where(_id: params[:id]).first
                if not kib_validate.present?
                    render json: {error: "Id tidak dapat ditemukan!"}, status: :unprocessable_entity
                elsif kib_validate.status_kib == Enums::KibStatus::DELETED
                    render json: {error: "Barang sudah dihapus, tidak dapat di Edit!"}, status: :unprocessable_entity
                else
                    begin
                        @kib_c = Barang::Kibc.find(params[:id])
                        kode_lokasi = params[:kode_lokasi]
                        nama_barang = params[:nama_barang]
                        nomor_register = params[:nomor_register]
                        kondisi_bangunan = params[:kondisi_bangunan]
                        tingkat_bangunan = params[:tingkat_bangunan]
                        beton_bangunan = params[:beton_bangunan]
                        luas_lantai = params[:luas_lantai]
                        alamat = params[:alamat]
                        dokumen_gedung = params[:dokumen_gedung]
                        luas = params[:luas]
                        status = params[:status]
                        nomor_tanah = params[:nomor_tanah]
                        asal_usul = params[:asal_usul]
                        harga = params[:harga]
                        keterangan = params[:keterangan]
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_c.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_c.nama_barang
                        end
                        if params[:nomor_register].blank?
                            nomor_register = @kib_c.nomor_register
                        end
                        if params[:kondisi_bangunan].blank?
                            kondisi_bangunan = @kib_c.kondisi_bangunan
                        end
                        if params[:tingkat_bangunan].blank? 
                            tingkat_bangunan = @kib_c.tingkat_bangunan
                        end
                        if params[:beton_bangunan].blank?
                            beton_bangunan = @kib_c.beton_bangunan
                        end
                        if params[:luas_lantai].blank?
                            luas_lantai = @kib_c.luas_lantai
                        end
                        if params[:alamat].blank?
                            alamat = @kib_c.alamat
                        end
                        if params[:dokumen_gedung].blank?
                            dokumen_gedung = @kib_c.dokumen_gedung
                        end
                        if params[:luas].blank?
                            luas = @kib_c.luas
                        end
                        if params[:status].blank?
                            status = @kib_c.status
                        end
                        if params[:asal_usul].blank?
                            asal_usul = @kib_c.asal_usul
                        end
                        if params[:harga].blank?
                            harga = @kib_c.harga
                        end
                        if params[:keterangan].blank?
                            keterangan = @kib_c.keterangan
                        end
                        @kib_c.assign_attributes({kode_lokasi: kode_lokasi, nama_barang: nama_barang, nomor_register: nomor_register,
                            kondisi_bangunan: kondisi_bangunan, tingkat_bangunan: tingkat_bangunan, beton_bangunan: beton_bangunan, 
                            luas_lantai: luas_lantai, alamat: alamat, dokumen_gedung: dokumen_gedung, luas: luas, status: status,
                            asal_usul: asal_usul, harga: harga, keterangan: keterangan})
                        @kib_c.save(:validate => false)
                        render json: {succes: @kib_c}, status: :ok                
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
                @kib_c = Barang::Kibc.find(params[:id])
                if not @kib_c.present?
                    render json: {error: "Id tidak ada!"}, status: :unprocessable_entity
                else
                    @kib_c.assign_attributes({status_kib: Enums::KibStatus::DELETED})
                    @kib_c.save(:validate => false)
                    render json: {success: @kib_c}, status: :ok
                end
            end
        end
    end
    
    def search
        @search = Barang::Kibc.all.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        if not @search.present?
            render json: {error: "Keyword tidak dapat ditemukan!"}, status: :unprocessable_entity
        else
            render json: {success: "Berhasil ditemukan!", response: @search}, status: :ok
        end
    end
  
    private
  
    def user_params
        params.permit(:kode_lokasi, :nama_barang, :nomor_register, :kondisi_bangunan, :tingkat_bangunan, :beton_bangunan, 
            :luas_lantai, :alamat, :dokumen_gedung, :luas, :status, :nomor_tanah, :asal_usul, :harga,
             :keterangan).merge!({status_kib: Enums::KibStatus::NEW})
    end
end