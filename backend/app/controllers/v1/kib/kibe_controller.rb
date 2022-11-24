class V1::Kib::KibeController < ApplicationController
    before_action :authorize_request
  
    def index
        @kib_e = Barang::Kibe.all.undeleted
        if not @kib_e.present?
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @kib_e
                }, status: :ok
        end
    end
  
    def create
        if role.match(/Pengguna/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            @kib_e = Barang::Kibe.new(user_params)
            nomor_registered = Barang::Kibe.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
            if nomor_registered.present?
                render json: {
                    response_code: 422,
                    response_message: "Nomor register tidak boleh sama!"
                    }, status: :unprocessable_entity 
            else
                if @kib_e.save
                    render json: {
                        response_code: 201, 
                        response_message: "Success", 
                        data: @kib_e
                        }, status: :created
                else
                    render json: {
                        response_code: 422,
                        response_message: @kib_e.errors.full_messages
                        }, status: :unprocessable_entity
                end
            end
        end
    end
  
    def edit
        if role.match(/Pengguna/).present?
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
                kib_validate = Barang::Kibe.where(_id: params[:id]).first
                if not kib_validate.present?
                    render json: {
                        response_code: 422, 
                        response_message: "Id tidak dapat ditemukan!"
                        }, status: :unprocessable_entity
                elsif kib_validate.status_kib == Enums::Kib::DELETED
                    render json: {
                        response_code: 422, 
                        response_message: "Barang sudah dihapus, tidak dapat di Edit!"
                        }, status: :unprocessable_entity
                else
                    begin
                        @kib_e = Barang::Kibe.find(params[:id])
                        kode_barang = params[:kode_barang]
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
                        if params[:kode_barang].blank?
                            kode_barang = @kib_e.kode_barang
                        end
                        if params[:kode_lokasi].blank? 
                            kode_lokasi = @kib_e.kode_lokasi
                        end
                        if params[:nama_barang].blank?
                            nama_barang = @kib_e.nama_barang
                        end
                        if params[:nomor_register].blank? or params[:nomor_register] == @barang.nomor_register
                            nomor_register = @kib_e.nomor_register
                        else
                            is_trigger = true
                            nomor_registered = Barang::Kibe.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
                            if nomor_registered.present?
                                render json: {
                                    response_code: 422, 
                                    response_message: "Nomor register tidak boleh sama!"
                                    }, status: :unprocessable_entity
                                is_trigger = false
                            end
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
                        @kib_e.assign_attributes({
                            kode_barang: kode_barang,
                            kode_lokasi: kode_lokasi, 
                            nama_barang: nama_barang, 
                            nomor_register: nomor_register,
                            judul_buku: judul_buku, 
                            spesifikasi_buku: spesifikasi_buku, 
                            asal_kesenian: asal_kesenian, 
                            pencipta_kesenian: pencipta_kesenian, 
                            bahan_kesenian: bahan_kesenian, 
                            jenis: jenis, ukuran: ukuran, 
                            tahun_pembelian: tahun_pembelian, 
                            asal_usul: asal_usul, 
                            harga: harga, 
                            keterangan: keterangan})
                        if is_trigger == true
                            if @kib_e.save(:validate => false)
                                render json: {
                                    response_code: 200, 
                                    response_message: "Success", 
                                    data: @kib_e
                                    }, status: :ok
                            else
                                render json: {
                                    response_code: 422, 
                                    response_message: "Edit gagal!, silahkan di coba kembali"
                                    }, status: :unprocessable_entity
                            end
                        end
                    rescue Exception => e
                        render json: {
                            response_code: 422, 
                            response_message: "edit gagal #{e}"
                            }, status: :unprocessable_entity
                    end
                end
            end
        end
    end
    
    def delete
        if role.match(/Pengguna/).present?
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
                if @kib_e = Barang::Kibe.find(_id: params[:id]).status_kib == Enums::KibStatus::DELETED
                    render json: {
                        response_code: 422, 
                        response_message: "Barang sudah dihapus!"
                        }, status: :unprocessable_entity
                else
                    @kib_e = Barang::Kibe.undeleted.where(_id: params[:id])
                    if not @kib_e.present?
                        render json: {
                            response_code: 422, 
                            response_message: "Id tidak dapat ditemukan!"
                            }, status: :unprocessable_entity
                    else
                        @kib_e.assign_attributes({status_kib: Enums::Kib::DELETED})
                        @kib_e.save(:validate => false)
                        render json: {
                            response_code: 200, 
                            response_message: "Success",
                            data: @kib_e
                            }, status: :ok
                    end
                end
            end
        end
    end

    def search
        @search = Barang::Kibe.all.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
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
  
    private
  
    def user_params
        params.permit(:kode_barang, :kode_lokasi, :nama_barang, :nomor_register, :judul_buku, :spesifikasi_buku, :asal_kesenian, :pencipta_kesenian, 
            :bahan_kesenian, :jenis, :ukuran, :jumlah, :tahun_pembelian, :asal_usul, 
            :harga, :keterangan)
    end
end