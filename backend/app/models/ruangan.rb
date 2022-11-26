class Ruangan
  include Mongoid::Document
  include Mongoid::Timestamps
  field :nama_ruangan, type: String
  field :bidang_ruangan, type: String
  field :kelompok_ruangan, type: String
end
