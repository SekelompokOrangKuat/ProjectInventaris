class Pengelola::Mutasibarang
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic

    belongs_to :barang_kibb, class_name: "Barang::Kibb", optional: true

    field :satuan, type: String
    field :harga_awal, type: Integer
    field :harga_berkurang, type: Integer
    field :harga_bertambah, type: Integer
    field :jumlah_awal, type: Integer, default: 1
    field :jumlah_berkurang, type: Integer
    field :jumlah_bertambah, type: Integer

end