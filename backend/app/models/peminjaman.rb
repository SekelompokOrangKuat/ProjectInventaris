class Peminjaman
    include Mongoid::Document
    include Mongoid::Timestamps
    field :tanggal_peminjaman, type: Date
    field :tanggal_pengembalian, type: Date
    field :status_peminjaman, type: Integer

    has_one :barang_kibb, class_name: "Barang::Kibb"
  end
  