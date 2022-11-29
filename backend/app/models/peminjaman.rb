class Peminjaman
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic
    field :tanggal_peminjaman, type: Date
    field :tanggal_pengembalian, type: Date
    field :status_peminjaman, type: Integer
    field :nama_peminjam, type: String 
    field :nip_peminjam, type: String
    field :hp_peminjam, type: String
    field :unit_kerja, type: String

    scope :pending, -> { where(status_peminjaman: Enums::StatusPeminjaman::PENDING)}
    scope :borrowed, -> { where(status_peminjaman: Enums::StatusPeminjaman::BORROWED)}
    scope :done, -> { where(status_peminjaman: Enums::StatusPeminjaman::DONE)}

    has_one :barang_kibb, class_name: "Barang::Kibb"
  end
  