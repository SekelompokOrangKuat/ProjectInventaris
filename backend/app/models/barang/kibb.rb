class Barang::Kibb
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic
    
    belongs_to :user_pengadaan, class_name: "User::Pengadaan", optional: true

    field :kode_lokasi, type: String
    field :nama_barang, type: String
    field :nomor_register, type: String
    field :tipe_barang, type: String
    field :bahan_barang, type: String
    field :tahun_pembelian, type: String
    field :nomor_pabrik, type: String
    field :nomor_rangka, type: String
    field :nomor_mesin, type: String
    field :nomor_polisi, type: String
    field :asal_usul, type: String
    field :harga_barang, type: String
    field :keterangan, type: String
    field :status_kib, type: Integer, default: proc { user_pengadaan ?  2 : 0}

    scope :undeleted, -> { where(status_kib: Enums::Kib::NEW) }
    scope :pengadaan, -> { where(status_kib: Enums::Kib::PENGADAAN)}

end  