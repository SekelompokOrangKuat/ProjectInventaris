class V1::Pengelola::MutasiController < ApplicationController
    before_action :authorize_request

    #Find All Mutasi
    def index
        mutasi = Pengelola::Mutasibarang.where(:barang_kibb_id.in => Barang::Kibb.undeleted.pluck(:_id))
        barang = Barang::Kibb.undeleted.where(:_id.in => Pengelola::Mutasibarang.pluck(:barang_kibb_id))
        if not mutasi.present?
            render json: {
                response_code: 422,
                response_message: "Tidak ada data!"
            }, status: :unprocessable_entity
        else
            render json: {
                response_code: 200,
                response_message: "Success",
                data: {mutasi: mutasi, barang: barang}
            }, status: :ok
        end
    end

    #GET All kode_barang
    def get_all_kode_barang
        kode_barang = Barang::Kibb.undeleted
        if not kode_barang.present?
            render json: {
                response_code: 422,
                response_message: "Tidak ada data!"
            }, status: :unprocessable_entity
        else
            render json: {
                data: kode_barang.pluck(:kode_barang)
            }, status: :ok
        end
    end

    #GET Nomor Register by kode_barang
    def get_nomor_register
        kode_barang = Barang::Kibb.undeleted.where(kode_barang: params[:kode_barang])
        if not kode_barang.present?
            render json: {
                response_code: 422,
                response_message: "Tidak ada data!"
            }, status: :unprocessable_entity
        else
            render json: {
                data: kode_barang.pluck(:nomor_register)
            }, status: :ok
        end
    end

    #GET Atribut Barang By kode_barang & nomor_register
    def get_barang
        barang = Barang::Kibb.undeleted.where(kode_barang: params[:kode_barang]).where(nomor_register: params[:nomor_register]).first
        render json: {
            data: barang
        }, status: :ok
    end

    #Buat Mutasi Baru
    def create
        if not role.match(/Pengelola/).present?
            render json: {
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: :unauthorized
        else
            barang = Barang::Kibb.undeleted.where(kode_barang: params[:kode_barang]).where(nomor_register: params[:nomor_register]).first
            if not params[:jumlah_bertambah].blank? or params[:jumlah_bertambah] != 0
                jumlah_akhir = 1 + params[:jumlah_bertambah]
                harga_akhir = barang.harga_barang.to_i + params[:harga_bertambah]
            elsif not params[:jumlah_berkurang].blank? or params[:jumlah_berkurang] != 0
                jumlah_akhir = 1 - params[:jumlah_berkurang]
                harga_akhir = barang.harga_barang.to_i - params[:harga_berkurang]
            else
                jumlah_akhir = 1
                harga_akhir = barang.harga_barang.to_i
            end
            if mutasi = Pengelola::Mutasibarang.create(
                satuan: params[:satuan],
                harga_awal: barang.harga_barang.to_i,
                harga_berkurang: params[:harga_berkurang],
                harga_bertambah: params[:harga_bertambah],
                jumlah_awal: params[:jumlah_awal],
                jumlah_berkurang: params[:jumlah_berkurang],
                jumlah_bertambah: params[:jumlah_bertambah],
                harga_akhir: harga_akhir,
                jumlah_akhir: jumlah_akhir,
                barang_kibb: barang
            )
            render json:{
                response_code: 200,
                response_message: "Success",
                data: {mutasi: mutasi, barang: mutasi.barang_kibb}
            }, status: :ok
            else
                render json: {
                    response_code: 422,
                    response_message: "Gagal membuat Mutasi Barang!"
                }, status: :unprocessable_entity
            end
        end
    end



    #Edit Mutasi Barang
    def edit
        if not role.match(/Pengelola/).present?
            render json: {
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: :unauthorized
        else
            if params[:id].blank?
                render json: {
                    resposne_code: 422,
                    response_message: "id tidak boleh kosong!"
                }, status: :unprocessable_entity
            else
                @mutasi = Pengelola::Mutasibarang.find(params[:id])
                @barang
                if not @mutasi.present?
                    render json: {
                        response_code: 422,
                        response_message: "Id tidak dapat ditemukan!"
                    }, status: :unprocessable_entity
                else
                    begin
                        satuan = params[:satuan]
                        jumlah_awal = params[:jumlah_awal]
                        harga_awal = params[:harga_awal]
                        if params[:satuan].blank?
                            satuan = @mutasi.satuan
                        end
                        if params[:jumlah_awal].blank?
                            jumlah_awal = @mutasi.jumlah_awal
                        end
                        if params[:harga_awal].blank?
                            harga_awal = @mutasi.harga_awal
                        end
                        if params[:jumlah_berkurang].blank?
                            jumlah_berkurang = @mutasi.jumlah_berkurang
                        else
                            jumlah_berkurang = params[:jumlah_berkurang]
                            jumlah_akhir = @mutasi.jumlah_awal - jumlah_berkurang
                        end
                        if params[:jumlah_bertambah].blank?
                            jumlah_bertambah = @mutasi.jumlah_bertambah
                        else
                            jumlah_bertambah = params[:jumlah_bertambah]
                            jumlah_akhir = @mutasi.jumlah_awal + jumlah_bertambah
                        end
                        if params[:harga_berkurang].blank?
                            harga_berkurang = @mutasi.harga_berkurang
                        else
                            harga_berkurang = params[:harga_berkurang]
                            harga_akhir = @mutasi.harga_awal - harga_berkurang
                        end
                        if params[:harga_bertambah].blank?
                            harga_bertambah = @mutasi.harga_bertambah
                        else
                            harga_bertambah = params[:harga_bertambah]
                            harga_akhir = @mutasi.harga_awal + harga_bertambah
                        end
                        @mutasi.assign_attributes({
                            satuan: satuan,
                            jumlah_awal: jumlah_awal,
                            harga_awal: harga_awal,
                            jumlah_berkurang: jumlah_berkurang,
                            jumlah_bertambah: jumlah_bertambah,
                            harga_berkurang: harga_berkurang,
                            harga_bertambah: harga_bertambah,
                            harga_akhir: harga_akhir,
                            jumlah_akhir: jumlah_akhir
                        })
                        if @mutasi.save(:validate => false)
                            render json: {
                                response_code: 200,
                                response_message: "Success",
                                data: @mutasi
                            }, status: :ok
                        else
                            render json: {
                                response_code: 422,
                                response_message: "Edit gagal!, silahkan di coba kembali"
                            }, status: :unprocessable_entity
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

    #Delete Mutasi Barang
    def delete
        if not role.match(/Pengelola/).present?
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
                @mutasi = Pengelola::Mutasibarang.find(params[:id])
                if not @mutasi.present?
                    render json: {
                        response_code: 422,
                        response_message: "Id tidak dapat ditemukan"
                    }, status: :unprocessable_entity
                else
                    @mutasi.destroy
                    render json: {
                        response_code: 200,
                        response_message: "Success"
                    }, status: :ok
                end
            end
        end
    end
    mutasi = Pengelola::Mutasibarang.where(:barang_kibb_id.in => Barang::Kibb.undeleted.pluck(:_id))
    barang = Barang::Kibb.undeleted.where(:_id.in => Pengelola::Mutasibarang.pluck(:barang_kibb_id))
    #Find One Mutasi Barang
    def search
        if not role.match(/Pengelola/).present?
            render json: {
                response_code: 401,
                response_message: "Tidak memiliki akses!"
            }, status: unauthorized
        else
            @mutasi = Pengelola::Mutasibarang.all.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
            if @mutasi.present?
                barang = Barang::Kibb.undeleted.where(:_id.in => @mutasi.pluck(:barang_kibb_id))
                render json: {
                    response_code: 200,
                    response_message: "Success",
                    data: {barang: barang, mutasi: @mutasi}
                }, status: :ok
            else not @mutasi.present?
                @barang = Barang::Kibb.undeleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
                mutasi = Pengelola::Mutasibarang.where(:barang_kibb_id.in => @barang.pluck(:_id))
                if @barang.present?
                    render json: {
                        response_code: 200,
                        response_message: "Success",
                        data: {barang: @barang, mutasi: mutasi}
                    }, status: :ok
                else
                    render json: {
                        response_code: 422,
                        response_message: "Keyword tidak dapat ditemukan!"
                    }, status: :unprocessable_entity
                end
            end
        end
    end

    private
    def user_params
        params.permit(:satuan, :harga_awal, :harga_berkurang, :harga_bertambah, :jumlah_awal, :jumlah_berkurang, :jumlah_bertambah)
    end
end