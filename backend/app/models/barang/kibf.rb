class Barang::Kibf
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  
  validates_inclusion_of :bangunan, in: %w(P S D), message: "harus P/S/D"
  validates_inclusion_of :tingkat_bangunan, in: %w(Bertingkat Tidak), message: "harus Bertingkat/Tidak"
  validates_inclusion_of :beton_bangunan, in: %w(Beton Tidak), message: "harus Beton/Tidak"
  validates_inclusion_of :status, in: %w(SHM AJB HGB), message: "harus SHM/AJB/HGB"
  validates :nomor_register, presence: true, uniqueness: true

  field :kode_lokasi, type: String
  field :nama_barang, type: String
  field :bangunan, type: String
  field :tingkat_bangunan, type: String
  field :beton_bangunan, type: String
  field :luas, type: String
  field :alamat, type: String
  field :nomor_dokumen, type: String
  field :tanggal_dokumen, type: String
  field :tanggal_mulai, type: String
  field :status, type: String
  field :nomor_tanah, type: String
  field :asal_usul, type: String
  field :nilai_kontrak, type: String
  field :keterangan, type: String
  field :status_kib, type: Integer, default: Enums::Kib::NEW

  scope :undeleted, -> { where(status_kib: Enums::Kib::NEW) }
end  