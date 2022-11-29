require 'swagger_helper'

describe 'CRUD Mutasi Barang' do
    path '/v1/pengelola/mutasi/create' do
        post 'Create Mutasi Barang' do
            tags 'Mutasi Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, requied: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    satuan: {type: :string, example: "Unit"},
                    jumlah_awal: {type: :integer, example: 1},
                    kode_barang: {type: :string, example: "1.3.2.02.01.01.001"},
                    nomor_register: {type: :string, example: "0001"},
                    jumlah_bertambah: {type: :integer, example: 1},
                    jumlah_berkurang: {type: :integer, example: 0},
                    harga_berkurang: {type: :integer, example: 0},
                    harga_bertambah: {type: :integer, example: 1000000}
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
                        response_message: {type: :string, example: "Mutasi Barang gagal di buat, silahkan di coba kembali!"},
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

    path '/v1/pengelola/mutasi/search' do
        post 'Search Mutasi Barang' do
            tags 'Mutasi Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    keywords: {type: :string, example: "Portable"}
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
                        response_message: {type: :string, example: "Mutasi Barang tidak ditemukan!"},
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
                    id: {type: :string, example: "6383c2e4377be028d43ab0e4"},
                    jumlah_bertambah: {type: :integer, example: 1},
                    jumlah_berkurang: {type: :integer, example: 0},
                    harga_berkurang: {type: :integer, example: 0},
                    harga_bertambah: {type: :integer, example: 2000000}
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
                        response_message: {type: :string, example: "Mutasi Barang tidak ditemukan!"},
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

    path '/v1/pengelola/mutasi/delete' do
        post 'Delete Mutasi Barang' do
            tags 'Mutasi Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    id: {type: :string, example: "6383c2e4377be028d43ab0e4"}
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
                        response_message: {type: :string, example: "Mutasi Barang tidak ditemukan!"},
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

    path '/v1/pengelola/mutasi/findAll' do
        get 'Find All Mutasi Barang' do
            tags 'Mutasi Barang'
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
                        response_message: {type: :string, example: "Mutasi Barang tidak ditemukan!"},
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

    path '/v1/pengelola/mutasi/findAllkodebarang' do
        get 'Find All Kode Barang' do
            tags 'Mutasi Barang'
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

    path '/v1/pengelola/mutasi/get_noreg' do
        post 'Find Nomor Registrasi Barang' do
            tags 'Mutasi Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    kode_barang: {type: :string, example: "1.3.2.02.01.01.001"}
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
                        response_message: {type: :string, example: "Nomor Registrasi Barang tidak ditemukan!"},
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
    path '/v1/pengelola/mutasi/get_barang' do
        post 'Find Barang by Nomor Registrasi  & Kode Barang' do
            tags 'Mutasi Barang'
            consumes 'application/json'
            produces 'application/json'
            parameter name: 'Authorization', in: :header, type: :string, required: true
            parameter name: :body, in: :body, schema: {
                type: :object,
                properties: {
                    kode_barang: {type: :string, example: "1.3.2.02.01.01.001"},
                    nomor_register: {type: :string, example: "0001"}
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
                        response_message: {type: :string, example: "Barang tidak ditemukan!"},
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