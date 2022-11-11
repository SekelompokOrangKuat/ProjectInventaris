class Barang::Kibc
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  
  validates_inclusion_of :kondisi_bangunan, in: %w(B KB RB), message: "harus B/KB/RB"
  validates_inclusion_of :tingkat_bangunan, in: %w(Bertingkat Tidak), message: "harus Bertingkat/Tidak"
  validates_inclusion_of :beton_bangunan, in: %w(Beton Tidak), message: "harus Beton/Tidak"
  validates_inclusion_of :status, in: %w(SHM AJB HGB), message: "harus SHM/AJB/HGB"

  field :kode_lokasi, type: String
  field :nama_barang, type: String
  field :nomor_register, type: String
  field :kondisi_bangunan, type: String
  field :tingkat_bangunan, type: String
  field :beton_bangunan, type: String
  field :luas_lantai, type: String
  field :alamat, type: String
  field :dokumen_gedung, type: String
  field :luas, type: String
  field :status, type: String
  field :nomor_tanah, type: String
  field :asal_usul, type: String
  field :harga, type: String
  field :keterangan, type: String
  field :status_kib, type: Integer

  scope :undeleted, -> { where(status_kib: Enums::KibStatus::NEW) }
end  