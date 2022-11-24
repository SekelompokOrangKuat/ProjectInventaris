class Barang::Kibe
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  
  validates :nomor_register, presence: true
  validates :nama_barang, presence: true
  
  field :kode_barang, type: String
  field :kode_lokasi, type: String
  field :nama_barang, type: String
  field :nomor_register, type: String
  field :judul_buku, type: String
  field :spesifikasi_buku, type: String
  field :asal_kesenian, type: String
  field :pencipta_kesenian, type: String
  field :bahan_kesenian, type: String
  field :jenis, type: String
  field :ukuran, type: String
  field :jumlah, type: String
  field :tahun_pembelian, type: String
  field :asal_usul, type: String
  field :harga, type: String
  field :keterangan, type: String
  field :status_kib, type: Integer, default: Enums::Kib::NEW

  scope :undeleted, -> { where(status_kib: Enums::Kib::NEW) }
end  