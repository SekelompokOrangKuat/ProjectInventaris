class Barang::Kiba
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  
  validates_inclusion_of :status_tanah, in: %w(SHM AJB), message: "harus SHM/AJB"

  field :kode_lokasi, type: String
  field :nama_barang, type: String
  field :nomor_register, type: String
  field :luas, type: String
  field :tahun_pengadaan, type: String
  field :alamat, type: String
  field :kota, type: String
  field :status_tanah, type: String
  field :nomor_sertifikat, type: String
  field :penggunaan, type: String
  field :asal_usul, type: String
  field :nilai_perolehan, type: String
  field :keterangan, type: String
  field :status_kib, type: Integer, default: Enums::Kib::NEW

  scope :undeleted, -> { where(status_kib: Enums::Kib::NEW) }
end  