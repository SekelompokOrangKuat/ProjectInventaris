class V1::User::PengusulanController < ApplicationController
    before_action :authorize_request
    
    def create
        if params[:nama_pengusul].blank? 
            render json: {
                response_code: 422, 
                response_message: "Nama Pengusul tidak boleh kosong!"
                }, status: :unprocessable_entity
        elsif params[:jenis_usulan].blank? 
            render json: {
                response_code: 422, 
                response_message: "Jenis usulan tidak boleh kosong!"
                }, status: :unprocessable_entity
        elsif params[:nama_barang].blank?
            render json: {
                response_code: 422, 
                response_message: "Nama barang tidak boleh kosong!"
                }, status: :unprocessable_entity
        elsif params[:nomor_register].blank?
            render json: {
                response_code: 422, 
                response_message: "Nomor register tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            @barang = Barang::Kibb.where(nama_barang: params[:nama_barang])
            @barang = @barang.where(nomor_register: params[:nomor_register]).first
            if not @barang.present?
                render json: {
                    response_code: 422, 
                    response_message: "Nomor register tidak dapat ditemukan!"
                    }, status: :unprocessable_entity
            else
                @pengusulan = User::Pengusulan.pending.find(@barang.user_pengusulan_id)
                if not @pengusulan.present?
                    render json: {
                        response_code: 422,
                        response_message: "Tidak ada data untuk diusulkan, silahkan lakukan penambahan data barang!",
                        }, status: :unprocessable_entity
                else
                    @pengusulan.assign_attributes({
                        nama_pengusul: params[:nama_pengusul],
                        jenis_usulan: params[:jenis_usulan],
                        kondisi_barang: params[:kondisi_barang],
                        keterangan: params[:keterangan],
                        foto_barang: params[:foto_barang],
                        status_usulan: Enums::StatusUsulan::NEW
                    })
                    if @pengusulan.save
                        render json: {
                            response_code: 201, 
                            response_message: "Success", 
                            data: {pengusulan: @pengusulan, barang: @barang}
                            }, status: :ok
                    else
                        render json: {
                            response_code: 422, 
                            response_message: @pengusulan.errors.full_messages 
                            }, status: :unprocessable_entity
                    end
                end
            end
        end
    end

    def approval
        #Cek role
        if role.match(/Penggguna/).present?
            render json: {
                response_code: 401, 
                response_message: "Tidak memiliki akses!"
                }, status: :unauthorized
        else
            if params[:id].blank?
                render json: {
                    response_code: 422, 
                    response_message: "id tidak boleh kosong!"
                    }, status: :unprocessable_entity
            else
                @approval_pengusulan = User::Pengusulan.new_usulan.where(_id: params[:id]).first
                @kibb = Barang::Kibb.where(user_pengusulan_id: params[:id]).first
                if not @approval_pengusulan.present? 
                    render json: {
                        response_code: 422, 
                        response_message: "Pengusulan sudah dilakukan Approval!"
                        }, status: :unprocessable_entity
                else
                    if params[:is_approve].blank?
                        render json: {
                            response_code: 422, 
                            response_message: "is_approve tidak boleh kosong!"
                            }, status: :unprocessable_entity
                    else
                        if params[:is_approve] == true
                            status_usulan = Enums::StatusUsulan::ACCEPTED
                            if @approval_pengusulan.jenis_usulan == "Penghapusan"
                                status_kib = Enums::Kib::PENGHAPUSAN
                            else
                                status_kib = Enums::Kib::NEW
                            end
                        else                            
                            status_usulan = Enums:StatusUsulan::REJECTED
                            status_kib = Enums::Kib::NEW
                        end
                        @approval_pengusulan.assign_attributes({status_usulan: status_usulan})
                        @kibb.assign_attributes({status_kib: status_kib})
                        if @kibb.save(:validate => false) and @approval_pengusulan.save(:validate => false)
                            render json: {
                                response_code: 200, 
                                response_message: "Success", 
                                data: {pengusulan: @approval_pengusulan, barang: @kibb}
                                }, status: :ok
                        else
                            render json: {
                                response_code: 422, 
                                response_message: "Gagal melakukan Approval, #{@kibb.errors.full_messages}, #{@pengusulan.errors.full_messages}"
                                }, status: :unprocessable_entity
                        end
                    end
                end
            end
        end
    end

    def edit
        if params[:id].blank?
            render json: {
                response_code: 422, 
                response_message: "id tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            @pengusulan = User::Pengusulan.new_usulan.where(_id: params[:id]).first
            if not @pengusulan.present?
                render json: {
                    response_code: 422, 
                    response_message: "Id tidak dapat ditemukan atau Pengusulan sudah dilakukan approval!"
                    }, status: :unprocessable_entity
            else
                begin
                    nama_pengusul = params[:nama_pengusul]
                    kondisi_barang = params[:kondisi_barang]
                    keterangan = params[:keterangan]
                    foto_barang = params[:foto_barang]
                    if params[:nama_pengusul].blank?
                        nama_pengusul = @pengusulan.nama_pengusul
                    end
                    if params[:kondisi_barang].blank?
                        kondisi_barang = @pengusulan.kondisi_barang
                    end
                    if params[:keterangan].blank?
                        keterangan = @pengusulan.keterangan
                    end
                    if params[:foto_barang].blank?
                        foto_barang = @pengusulan.foto_barang
                    end
                    @pengusulan.assign_attributes({
                        nama_pengusul: nama_pengusul,
                        kondisi_barang: kondisi_barang,
                        keterangan: keterangan,
                        foto_barang: foto_barang
                    })
                    
                    if @pengusulan.save
                        render json: {
                            response_code: 200,
                            response_message: "Success",
                            data: @pengusulan
                        }
                    else
                        render json: {
                            response_code: 422, 
                            response_message: @pengusulan.errors.full_messages
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

    def delete
        if params[:id].blank?
            render json: {
                response_code: 422, 
                response_message: "id tidak boleh kosong!"
                }, status: :unprocessable_entity
        else
            @pengusulan = User::Pengusulan.new_usulan.find(params[:id])
            @barang = Barang::Kibb.where(:user_pengusulan_id => @pengusulan.id).first
            if not @pengusulan.present?
                render json: {
                    response_code: 422, 
                    response_message: "Id tidak dapat ditemukan atau Pengusulan sudah dilakukan approval!"
                    }, status: :unprocessable_entity
            else
                @pengusulan.assign_attributes({status_usulan: Enums::StatusUsulan::DELETED})
                if @pengusulan.save
                    render json: {
                        response_code: 200, 
                        response_message: "Success", 
                        data: {pengusulan: @pengusulan, barang: @barang}
                        }, status: :ok
                else
                    render json: {
                        response_code: 422, 
                        response_message: @pengusulan.errors.full_messages
                        }, status: :unprocessable_entity
                end

            end
        end
    end

    def index_pemeliharaan
        @pengusulan = User::Pengusulan.new_usulan.pemeliharaan.where(:_id.in => Barang::Kibb.pluck(:user_pengusulan_id))
        @barang = Barang::Kibb.undeleted.where(:user_pengusulan_id.in => @pengusulan.pluck(:id))
        if @pengusulan.present?
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {pengusulan: @pengusulan, barang: @barang}
                }, status: :ok
        else
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        end
    end

    def index_penghapusan
        @pengusulan = User::Pengusulan.new_usulan.penghapusan.where(:_id.in => Barang::Kibb.pluck(:user_pengusulan_id))
        @barang = Barang::Kibb.undeleted.where(:user_pengusulan_id.in => @pengusulan.pluck(:id))
        if @pengusulan.present?
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {pengusulan: @pengusulan, barang: @barang}
                }, status: :ok
        else
            render json: {
                response_code: 422, 
                response_message: "Tidak ada data!"
                }, status: :unprocessable_entity
        end
    end

    def search_pemeliharaan
        @pengusulan = User::Pengusulan.pemeliharaan.new_usulan.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        if not @barang.present? and not @pengusulan.present?
            render json: {
                response_code: 422, 
                response_message: "Keyword tidak dapat ditemukan!"
                }, status: :unprocessable_entity
        elsif @pengusulan.present?
            barang = Barang::Kibb.undeleted.where(:user_pengusulan_id.in => @pengusulan.pluck(:id))
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: barang, pengusulan: @pengusulan}
                }, status: :ok
        elsif not @pengusulan.present?
            @barang = Barang::Kibb.undeleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
            pengusulan = User::Pengusulan.pemeliharaan.new_usulan.where(:_id.in => @barang.pluck(:user_pengusulan_id))
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: @barang, pengusulan: pengusulan}
                }, status: :ok
        end
    end

    def search_penghapusan
        @pengusulan = User::Pengusulan.penghapusan.new_usulan.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
        if not @barang.present? and not @pengusulan.present?
            render json: {
                response_code: 422, 
                response_message: "Keyword tidak dapat ditemukan!"
                }, status: :unprocessable_entity
        elsif @pengusulan.present?
            barang = Barang::Kibb.undeleted.where(:user_pengusulan_id.in => @pengusulan.pluck(:id))
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: barang, pengusulan: @pengusulan}
                }, status: :ok
        elsif not @pengusulan.present?
            @barang = Barang::Kibb.undeleted.select do | user | user.attributes.values.grep(/^#{params[:keywords]}/i).any? end
            pengusulan = User::Pengusulan.penghapusan.new_usulan.where(:_id.in => @barang.pluck(:user_pengusulan_id))
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: {barang: @barang, pengusulan: pengusulan}
                }, status: :ok
        end
    end

    def getBarang
        @barang = Barang::Kibb.where(nama_barang: params[:nama_barang]).where(nomor_register: params[:nomor_register]).first
        if @barang.present?
            render json: {
                response_code: 200, 
                response_message: "Success", 
                data: @barang
                }, status: :ok
        else 
            render json: {
                response_code: 422, 
                response_message: "Barang tidak dapat ditemukan!"
                }, status: :unprocessable_entity
        end
    end

end