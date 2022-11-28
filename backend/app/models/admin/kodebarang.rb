class Admin::Kodebarang
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic

    # has_one :barang_kibb, class_name: "Barang::Kibb"

    field :nama_barang, type: String
    field :golongan, type: String
    field :bidang, type: String
    field :kelompok, type: String
    field :sub_kelompok, type: String
    field :sub_sub_kelompok, type: String

end