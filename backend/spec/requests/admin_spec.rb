require 'swagger_helper'

describe 'CRUD Kode Barang' do
    path '/v1/admin/kb/create' do
        post 'Create Kode Barang' do
            tags 'Kode Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, requied: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    golongan: {type: :string, example: "02"},
                    bidang: {type: :string, example: "08"},
                    kelompok: {type: :string, example: "01"},
                    sub_kelompok: {type: :string, example: "01"},
                    sub_sub_kelompok: {type: :string, example: "01"},
                    nama_barang: {type: :string, example: "Sterilisator"}
                },
                required: []
            }
            response '201', 'Created' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Kode Barang gagal di buat, silahkan di coba kembali!"},
                        response_code: {type: :integer, example: 422}
                    }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                    }
                run_test!
            end
        end
    end

    path '/v1/admin/kb/search' do
        post 'Search Kode Barang' do
            tags 'Kode Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    keywords: {type: :string, example: "Sterilisator"}
                },
                required: []
            }
            response '200', 'Successfull' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Kode Barang tidak ditemukan!"},
                        response_code: {type: :integer, example: 422}
                    }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                    }
                run_test!
            end
        end
    end

    path '/v1/admin/kb/edit' do
        post 'Edit Kode Barang' do
            tags 'Kode Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    id: {type: :string, example: "637b82bc377be018f03103b3"},
                    golongan: {type: :string, example: "02"},
                    bidang: {type: :string, example: "08"},
                    kelompok: {type: :string, example: "01"},
                    sub_kelompok: {type: :string, example: "01"},
                    sub_sub_kelompok: {type: :string, example: "01"},
                    nama_barang: {type: :string, example: "Sterilisator"}
                },
                required: []
            }
            response '200', 'Successfull' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Kode Barang tidak ditemukan!"},
                        response_code: {type: :integer, example: 422}
                    }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                    }
                run_test!
            end
        end
    end

    path '/v1/admin/kb/delete' do
        post 'Delete Kode Barang' do
            tags 'Kode Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    id: {type: :string, example: "637b82bc377be018f03103b3"}
                },
                required: []
            }
            response '200', 'Successfull' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                        properties: {
                        response_message: {type: :string, example: "Kode Barang tidak ditemukan!"},
                            response_code: {type: :integer, example: 422}
                        }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                        properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                        }
                run_test!
            end
        end
    end

    path '/v1/admin/kb/findAll' do
        get 'Find All Kode Barang' do
            tags 'Kode Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            response '200', 'Successfull' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                        properties: {
                        response_message: {type: :string, example: "Kode Barang tidak ditemukan!"},
                            response_code: {type: :integer, example: 422}
                        }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                        properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                        }
                run_test!
            end
        end
    end

    #===========================SKPD==============================
    path '/v1/admin/skpd/create' do
        post 'Create SKPD' do
            tags 'SKPD'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, requied: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    jabatan: {type: :string, example: "Pengurus Barang"},
                    nama: {type: :string, example: "Jajang"},
                    nip: {type: :string, example: "19820511122014111001"},
                    pangkat: {type: :string, example: "Kepala SKPD"},
                    provinsi: {type: :string, example: "Jawa Barat"},
                    unit: {type: :string, example: "Dinas Pendidikan"},
                    satuan_kerja: {type: :string, example: "Pengurus Barang"}
                },
                required: []
            }
            response '201', 'Created' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "SKPD gagal di buat, silahkan di coba kembali!"},
                        response_code: {type: :integer, example: 422}
                    }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                    }
                run_test!
            end
        end
    end

    path '/v1/admin/skpd/findBy' do
        post 'Find All SKPD by Provinsi AND Unit AND Satuan Kerja' do
            tags 'SKPD'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    provinsi: {type: :string, example: "Jawa Barat"},
                    unit: {type: :string, example: "Dinas Pendidikan"},
                    satuan_kerja: {type: :string, example: "Pengurus Barang"}
                },
                required: []
            }
            response '200', 'Successfull' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "SKPD tidak ditemukan!"},
                        response_code: {type: :integer, example: 422}
                    }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                    }
                run_test!
            end
        end
    end

    path '/v1/admin/skpd/edit' do
        post 'Edit SKPD' do
            tags 'SKPD'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    jabatan: {type: :string, example: "Pengurus Barang"},
                    nama: {type: :string, example: "Toni"},
                    nip: {type: :string, example: "19820511122014111002"},
                    pangkat: {type: :string, example: "Kepala SKPD"},
                    provinsi: {type: :string, example: "Jawa Barat"},
                    unit: {type: :string, example: "Dinas Pendidikan"},
                    satuan_kerja: {type: :string, example: "Sekretariat"}
                },
                required: []
            }
            response '200', 'Successfull' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "SKPD tidak ditemukan!"},
                        response_code: {type: :integer, example: 422}
                    }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                    properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                    }
                run_test!
            end
        end
    end

    path '/v1/admin/skpd/delete' do
        post 'Delete SKPD' do
            tags 'SKPD'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    id: {type: :string, example: "637b82bc377be018f0310312"}
                },
                required: []
            }
            response '200', 'Successfull' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                        properties: {
                        response_message: {type: :string, example: "SKPD tidak ditemukan!"},
                            response_code: {type: :integer, example: 422}
                        }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                        properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                        }
                run_test!
            end
        end
    end

    path '/v1/admin/skpd/findAll' do
        get 'Find All SKPD' do
            tags 'SKPD'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            response '200', 'Successfull' do
                schema type: :object
                run_test!
            end
            response '422', 'Unprocessable Entity' do
                schema type: :object,
                        properties: {
                        response_message: {type: :string, example: "Tidak ada data!"},
                            response_code: {type: :integer, example: 422}
                        }
                run_test!
            end
            response '401', 'Unauthorized' do
                schema type: :object,
                        properties: {
                        response_message: {type: :string, example: "Tidak memiliki akses!"},
                        response_code: {type: :integer, example: 401}
                        }
                run_test!
            end
        end
    end
end
                