class User::Pengadaan
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic

    has_one :barang_kibb, class_name: "Barang::Kibb"

    field :nama_pengusul, type: String
    field :foto_barang, type: String
    field :status_usulan, type: Integer, default: Enums::KibStatus::NEW

    scope :new_pengusulan, -> { where(status_usulan: Enums::KibStatus::NEW) }

end