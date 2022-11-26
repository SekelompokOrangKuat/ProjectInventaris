class Barang::Kibb
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic
    
    belongs_to :user_pengadaan, class_name: "User::Pengadaan", optional: true
    belongs_to :user_pengusulan, class_name: "User::Pengusulan"
    belongs_to :peminjaman, class_name: "Peminjaman"
    
    validates :nomor_register, presence: true
    validates :nama_barang, presence: true

    field :nama_ruangan, type: String
    field :kode_barang, type: String
    field :kode_lokasi, type: String
    field :nama_barang, type: String
    field :nomor_register, type: String
    field :tipe_barang, type: String
    field :ukuran_barang, type: String
    field :bahan_barang, type: String
    field :tahun_pembelian, type: String
    field :nomor_pabrik, type: String
    field :nomor_rangka, type: String
    field :nomor_mesin, type: String
    field :nomor_polisi, type: String
    field :nomor_bpkb, type: String
    field :asal_usul, type: String
    field :harga_barang, type: String
    field :keterangan, type: String
    field :status_kib, type: Integer, default: proc { user_pengadaan ?  2 : 0}

    scope :undeleted, -> { where(status_kib: Enums::Kib::NEW) }
    scope :pengadaan, -> { where(status_kib: Enums::Kib::PENGADAAN)}
    scope :penghapusan, -> { where(status_kib: Enums::Kib::PENGADAAN )}
    scope :pending_pengusulan, -> { where(user_pengusulan_id: Enums::StatusUsulan::PENDING) }
    scope :peminjaman, -> { where(status_kib: Enums::Kib::PEMINJAMAN)}

    before_validation do 
        if new_record?
            self.user_pengusulan = User::Pengusulan.new({status_usulan: Enums::StatusUsulan::PENDING})
            self.user_pengusulan.save(:validate => false)
            self.peminjaman = Peminjaman.create({status_peminjaman: Enums::StatusPeminjaman::PENDING})
            self.peminjaman.save(:validate => false)
        end
    end

end  