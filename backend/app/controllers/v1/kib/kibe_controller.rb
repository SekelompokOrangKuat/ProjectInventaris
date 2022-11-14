class V1::Kib::KibeController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_e = Barang::Kibe.all.undeleted
        if not @kib_e.present?
            render json: {error: "Tidak ada data!"}, status: :unprocessable_entity
        else
            render json: @kib_e, status: :ok
        end
    end
  
    def find
        if params[:id].blank?
            render json: {error: "id tidak boleh kosong!"}, status: :unprocessable_entity
        else
            kib_e = Barang::Kibe.where(_id: params[:id]).first
            if not kib_e.present?
                render json: {error: "Barang tidak dapat ditemukan!"}, status: :unprocessable_entity
            elsif kib_e.status_kib == Enums::KibStatus::DELETED
                render json: {error: "Barang sudah dihapus!"}, status: :unprocessable_entity  
            else
                render json: {success: kib_e}, status: :ok
            end
        end
    end
  
    def create
        if role.match(/Pengguna/).present?
            render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
        else
            @kib_e = Barang::Kibe.new(user_params)
            if @kib_e.save
                render json: @kib_e, status: :created
            else
                render json: { errors: @kib_e.errors.full_messages }, status: :unprocessable_entity
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
                kib_validate = Barang::Kibe.where(_id: params[:id]).first
                if not kib_validate.present?
                    render json: {error: "Id tidak dapat ditemukan!"}, status: :unprocessable_entity
                elsif kib_validate.status_kib == Enums::KibStatus::DELETED
                    render json: {error: "Barang sudah dihapus, tidak dapat di Edit!"}, status: :unprocessable_entity
                else
                    begin
                        @kib_e = Barang::Kibe.find(params[:id])
                        kode_lokasi = params[:kode_lokasi]
                        nama_barang = params[:nama_barang]
                        nomor_register = params[:nomor_register]
                        judul_buku = params[:judul_buku]
                        spesifikasi_buku = params[:spesifikasi_buku]
                        asal_kesenian = params[:asal_kesenian]
                        pencipta_kesenian = params[:pencipta_kesenian]
                        bahan_kesenian = params[:bahan_kesenian]
                        jenis = params[:jenis]
                        ukuran = params[:ukuran]
                        jumlah = params[:jumlah]
                        tahun_pembelian = params[:tahun_pembelian]
                        asal_usul = params[:asal_usul]
                        harga = params[:harga]
                        keterangan = params[:keterangan]
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_e.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_e.nama_barang
                        end
                        if params[:nomor_register].blank?
                            nomor_register = @kib_e.nomor_register
                        end
                        if params[:judul_buku].blank?
                            judul_buku = @kib_e.judul_buku
                        end
                        if params[:spesifikasi_buku].blank? 
                            spesifikasi_buku = @kib_e.spesifikasi_buku
                        end
                        if params[:asal_kesenian].blank?
                            asal_kesenian = @kib_e.asal_kesenian
                        end
                        if params[:pencipta_kesenian].blank?
                            pencipta_kesenian = @kib_e.pencipta_kesenian
                        end
                        if params[:bahan_kesenian].blank?
                            bahan_barang = @kib_e.bahan_barang
                        end
                        if params[:jenis].blank?
                            jenis = @kib_e.jenis
                        end
                        if params[:jumlah].blank?
                            jumlah = @kib_e.jumlah
                        end
                        if params[:tahun_pembelian].blank?
                            tahun_pembelian = @kib_e.tahun_pembelian
                        end
                        if params[:asal_usul].blank?
                            asal_usul = @kib_e.asal_usul
                        end
                        if params[:harga].blank?
                            harga = @kib_e.harga
                        end
                        if params[:keterangan].blank?
                            keterangan = @kib_e.keterangan
                        end
                        @kib_e.assign_attributes({kode_lokasi: kode_lokasi, nama_barang: nama_barang, nomor_register: nomor_register,
                            judul_buku: judul_buku, spesifikasi_buku: spesifikasi_buku, asal_kesenian: asal_kesenian, 
                            pencipta_kesenian: pencipta_kesenian, bahan_kesenian: bahan_kesenian, jenis: jenis, ukuran: ukuran, 
                            tahun_pembelian: tahun_pembelian, asal_usul: asal_usul, harga: harga, keterangan: keterangan})
                        @kib_e.save(:validate => false)
                        render json: {succes: @kib_e}, status: :ok                
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
                @kib_e = Barang::Kibe.find(params[:id])
                if not @kib_e.present?
                    render json: {error: "Id tidak ada!"}, status: :unprocessable_entity
                else
                    @kib_e.assign_attributes({status_kib: Enums::KibStatus::DELETED})
                    @kib_e.save(:validate => false)
                    render json: {success: @kib_e}, status: :ok
                end
            end
        end
    end
  
    private
  
    def user_params
        params.permit(:kode_lokasi, :nama_barang, :nomor_register, :judul_buku, :spesifikasi_buku, :asal_kesenian, :pencipta_kesenian, 
            :bahan_kesenian, :jenis, :ukuran, :jumlah, :tahun_pembelian, :asal_usul, 
            :harga, :keterangan).merge!({status_kib: Enums::KibStatus::NEW})
    end
end