class User::Jadwal
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic

    field :tanggal, type: Date
    field :triwulan, type: Integer
    field :semester, type: Integer
    field :keterangan, type: String
    field :status_jadwal, type: Integer, default: Enums::Status::NEW

    scope :undeleted, -> { where(status_usulan: Enums::Status::NEW) }
    
end