class User::Jadwal
    include Mongoid::Document
    include Mongoid::Timestamps
    include Mongoid::Attributes::Dynamic

    field :tanggal, type: String
    field :triwulan, type: String
    field :semester, type: String
    field :keterangan, type: String
    field :status_jadwal, type: Integer, default: Enums::Status::NEW

    scope :undeleted, -> { where(status_jadwal: Enums::Status::NEW) }
    
end