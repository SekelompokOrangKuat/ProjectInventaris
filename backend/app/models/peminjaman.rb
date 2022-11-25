class Peminjaman
    include Mongoid::Document
    include Mongoid::Timestamps
    field :tanggal_peminjaman, type: Date
    field :tanggal_pengembalian, type: Date
    field :status_peminjaman, type: Integer

    scope :pending, -> { where(status_peminjaman: Enums::StatusPeminjaman::PENDING)}
    scope :borrowed, -> { where(status_peminjaman: Enums::StatusPeminjaman::BORROWED)}
    scope :done, -> { where(status_peminjaman: Enums::StatusPeminjaman::DONE)}

    has_one :barang_kibb, class_name: "Barang::Kibb"
  end
  