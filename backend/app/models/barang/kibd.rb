class Barang::Kibd
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  
  validates_inclusion_of :kondisi, in: %w(B KB RB), message: "harus B/KB/RB"
  validates_inclusion_of :status, in: %w(SHM AJB HGB), message: "harus SHM/AJB/HGB"

  field :kode_lokasi, type: String
  field :nama_barang, type: String
  field :nomor_register, type: String
  field :konstruksi, type: String
  field :panjang, type: String
  field :lebar, type: String
  field :luas, type: String
  field :nomor_dokumen, type: String
  field :tanggal_dokumen, type: String
  field :status, type: String
  field :nomor_tanah, type: String
  field :asal_usul, type: String
  field :harga, type: String
  field :kondisi, type: String
  field :keterangan, type: String
  field :status_kib, type: Integer, default: Enums::Kib::NEW

  scope :undeleted, -> { where(status_kib: Enums::Kib::NEW) }
end  