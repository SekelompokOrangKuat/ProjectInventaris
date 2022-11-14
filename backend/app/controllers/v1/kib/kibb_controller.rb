class V1::Kib::KibbController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_b = Barang::Kibb.all.undeleted
        if not @kib_b.present?
            render json: {error: "Tidak ada data!"}, status: :unprocessable_entity
        else
            render json: @kib_b, status: :ok
        end
    end
  
    def find
        if params[:id].blank?
            render json: {error: "id tidak boleh kosong!"}, status: :unprocessable_entity
        else
            kib_b = Barang::Kibb.where(_id: params[:id]).first
            if not kib_b.present?
                render json: {error: "Barang tidak dapat ditemukan!"}, status: :unprocessable_entity
            elsif kib_b.status_kib == Enums::KibStatus::DELETED
                render json: {error: "Barang sudah dihapus!"}, status: :unprocessable_entity  
            else
                render json: {success: kib_b}, status: :ok
            end
        end
    end
  
    def create
        if role.match(/Pengguna/).present?
            render json: {role: role, error:"Tidak memiliki akses!"}, status: :unauthorized
        else
            @kib_b = Barang::Kibb.new(user_params)
            if @kib_b.save
                render json: @kib_b, status: :created
            else
                render json: { errors: @kib_b.errors.full_messages }, status: :unprocessable_entity
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
                kib_validate = Barang::Kiba.where(_id: params[:id]).first
                if not kib_validate.present?
                    render json: {error: "Id tidak dapat ditemukan!"}, status: :unprocessable_entity
                elsif kib_validate.status_kib == Enums::KibStatus::DELETED
                    render json: {error: "Barang sudah dihapus!"}, status: :unprocessable_entity
                else
                    begin
                        @kib_b = Barang::Kiba.find(params[:id])
                        kode_lokasi = params[:kode_lokasi]
                        nama_barang = params[:nama_barang]
                        nomor_register = params[:nomor_register]
                        tipe_barang = params[:tipe_barang]
                        bahan_barang = params[:bahan_barang]
                        tahun_pembelian = params[:tahun_pembelian]
                        nomor_pabrik = params[:nomor_pabrik]
                        nomor_rangka = params[:nomor_rangka]
                        nomor_mesin = params[:nomor_mesin]
                        nomor_polisi = params[:nomor_polisi]
                        asal_usul = params[:asal_usul]
                        harga_barang = params[:harga_barang]
                        keterangan = params[:keterangan]
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_b.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_b.nama_barang
                        end
                        if params[:nomor_register].blank?
                            nomor_register = @kib_b.nomor_register
                        end
                        if params[:tipe_barang].blank?
                            tipe_barang = @kib_b.tipe_barang
                        end
                        if params[:bahan_barang].blank?
                            bahan_barang = @kib_b.bahan_barang
                        end
                        if params[:tahun_pembelian].blank? 
                            tahun_pembelian = @kib_b.tahun_pembelian
                        end
                        if params[:nomor_pabrik].blank?
                            nomor_pabrik = @kib_b.nomor_pabrik
                        end
                        if params[:nomor_rangka].blank?
                            nomor_rangka = @kib_b.nomor_rangka
                        end
                        if params[:nomor_mesin].blank?
                            nomor_mesin = @kib_b.nomor_mesin
                        end
                        if params[:nomor_polisi].blank?
                            nomor_polisi = @kib_b.nomor_polisi
                        end
                        if params[:asal_usul].blank?
                            asal_usul = @kib_b.asal_usul
                        end
                        if params[:harga_barang].blank?
                            harga_barang = @kib_b.harga_barang
                        end
                        if params[:keterangan].blank?
                            keterangan = @kib_b.keterangan
                        end
                        @kib_b.assign_attributes({kode_lokasi: kode_lokasi, nama_barang: nama_barang, nomor_register: nomor_register,
                            tipe_barang: tipe_barang, bahan_barang: bahan_barang, tahun_pembelian: tahun_pembelian, 
                            nomor_pabrik: nomor_pabrik, nomor_rangka: nomor_rangka, nomor_mesin: nomor_mesin, nomor_polisi: nomor_polisi, 
                            asal_usul: asal_usul, harga_barang: harga_barang, keterangan: keterangan})
                        @kib_b.save(:validate => false)
                        render json: {succes: @kib_b}, status: :ok                
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
                @kib_b = Barang::Kibb.find(params[:id])
                if not @kib_b.present?
                    render json: {error: "Id tidak dapat ditemukan!"}, status: :unprocessable_entity
                else
                    @kib_b.assign_attributes({status_kib: Enums::KibStatus::DELETED})
                    @kib_b.save(:validate => false)
                    render json: {success: @kib_b}, status: :ok
                end
            end
        end
    end
  
    private

    def user_params
        params.permit(:kode_lokasi, :nama_barang, :nomor_register, :tipe_barang, :bahan_barang, :tahun_pembelian, :nomor_pabrik, :nomor_rangka,
            :nomor_mesin, :nomor_polisi, :asal_usul, :harga_barang, :keterangan).merge!({status_kib: Enums::KibStatus::NEW})
    end
end