class User::Pengadaan
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic

    has_one :barang_kibb, class_name: "Barang::Kibb"

    field :nama_pengusul, type: String
    field :jumlah_barang, type: Integer, default: 1
    field :spesifikasi_barang, type: String
    field :foto_barang, type: String
    field :status_usulan, type: Integer, default: Enums::StatusUsulan::NEW

    scope :new_pengadaan, -> { where(status_usulan: Enums::StatusUsulan::NEW) }
end