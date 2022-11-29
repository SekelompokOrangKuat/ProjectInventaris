class Ruangan
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Attributes::Dynamic
  field :nama_ruangan, type: String
  field :bidang_ruangan, type: String
  field :kelompok_ruangan, type: String
end
