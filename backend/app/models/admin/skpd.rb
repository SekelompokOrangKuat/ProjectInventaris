class Admin::Skpd
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic

    # has_one :barang_kibb, class_name: "Barang::Kibb"

    field :jabatan, type: String
    field :nama, type: String
    field :nip, type: String
    field :pangkat, type: String
    field :provinsi, type: String
    field :unit, type: String
    field :satuan_kerja, type: String

end