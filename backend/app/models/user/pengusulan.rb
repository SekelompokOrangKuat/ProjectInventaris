class User::Pengusulan
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic

    has_one :barang_kibb, class_name: "Barang::Kibb"

    validates_inclusion_of :jenis_usulan, in: %w(Pemeliharaan Penghapusan), message: "harus Pemeliharaan/Penghapusan"

    field :nama_pengusul, type: String
    field :jenis_usulan, type: String
    field :jumlah_barang, type: Integer, default: 1
    field :status_usulan, type: Integer, default: Enums::StatusUsulan::NEW
    field :kondisi_barang, type: String
    field :keterangan, type: String
    field :foto_barang, type: String

    scope :new_usulan, -> { where(status_usulan: Enums::StatusUsulan::NEW) }
    scope :done, -> {where(status_usulan: Enums::StatusUsulan::ACCEPTED).where(status_usulan: Enums::StatusUsulan::REJECTED)}
    scope :pending, -> { where(status_usulan: Enums::StatusUsulan::PENDING) }
    scope :penghapusan, -> { where(jenis_usulan: "Penghapusan") }
    scope :pemeliharaan, -> { where(jenis_usulan: "Pemeliharaan") }
end