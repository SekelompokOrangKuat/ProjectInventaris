class Peminjaman
    include Mongoid::Document
    include Mongoid::Timestamps
    field :tanggal_peminjaman, type: Date
    field :tanggal_pengembalian, type: Date
  end
  