require 'swagger_helper'

describe 'KIB API' do
  #===========================KIB A==============================
  path '/v1/kib/kiba/create' do
    post 'Create KIB A' do
      tags 'KIB A'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            kode_lokasi: {type: :string, example: "01.02.03.04.05"},
            nama_barang: {type: :string, example: "Sepeda"},
            nomor_register: {type: :string, example: "0003"},
            luas: {type: :string, example: "1m"},
            tahun_pengadaan: {type: :string, example: "2021"},
            alamat: {type: :string, example: "Rancamanyar"},
            kota: {type: :string, example: "Kabupaten Bandung"},
            status_tanah: {type: :string, example: "AJB"},
            nomor_sertifikat: {type: :string, example: "210380183129"},
            penggunaan: {type: :string, example: "Alat Transportasi"},
            asal_usul: {type: :string, example: "APBD"},
            nilai_perolehan: {type: :string, example: "Rp. 250000"},
            keterangan: {type: :string, example: "Layak Pakai"},
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
                  response_message: {type: :string, example: "Kesalahan Parameter"},
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

  path '/v1/kib/kiba/search' do
    post 'Search KIB A' do
      tags 'KIB A'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            keywords: {type: :string, example: "Sepeda"},
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kiba/edit' do
    post 'Edit KIB A' do
      tags 'KIB A'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          id: {type: :string, example: "636dfb9ae21fac2cd4510353"},
          kode_lokasi: {type: :string, example: "01.02.03.04.05"},
          nama_barang: {type: :string, example: "Motor"},
          nomor_register: {type: :string, example: "0003"},
          luas: {type: :string, example: "2m"},
          tahun_pengadaan: {type: :string, example: "2021"},
          alamat: {type: :string, example: "Rancamanyar"},
          kota: {type: :string, example: "Kabupaten Bandung"},
          status_tanah: {type: :string, example: "SHM"},
          nomor_sertifikat: {type: :string, example: "210380183129"},
          penggunaan: {type: :string, example: "Alat Trasportasi"},
          asal_usul: {type: :string, example: "APBD"},
          nilai_perolehan: {type: :string, example: "Rp. 14000000"},
          keterangan: {type: :string, example: "Layak Pakai"},
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
                  response_message: {type: :string, example: "Id tidak dapat ditemukan!"},
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

  path '/v1/kib/kiba/delete' do
    post 'Delete KIB A' do
      tags 'KIB A'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636dfb9ae21fac2cd4510353"}
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kiba/findAll' do
    get 'Find All KIB A' do
      tags 'KIB A'
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

  #===========================KIB B==============================
  path '/v1/kib/kibb/create' do
    post 'Create KIB B' do
      tags 'KIB B'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          kode_lokasi: {type: :string, example: "02.06.01.04.02"},
          nama_barang: {type: :string, example: "Kipas Angin"},
          nomor_register: {type: :string, example: "0001"},
          tipe_barang: {type: :string, example: "Harian"},
          bahan_barang: {type: :string, example: "Plastik"},
          tahun_pembelian: {type: :string, example: "2018"},
          nomor_pabrik: {type: :string, example: "SKDJ1231"},
          nomor_rangka: {type: :string, example: "MHFAB3EM1G0004620"},
          nomor_mesin: {type: :string, example: "2GDC109312"},
          nomor_polisi: {type: :string, example: "D 2019 PTP"},
          asal_usul: {type: :string, example: "APBD"},
          harga_barang: {type: :string, example: "Rp. 150000"},
          keterangan: {type: :string, example: "Barang Baik"},
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
                  response_message: {type: :string, example: "Kesalahan Parameter"},
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

  path '/v1/kib/kibb/search' do
    post 'Search KIB B' do
      tags 'KIB B'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "Kipas Angin"},
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibb/edit' do
    post 'Edit KIB B' do
      tags 'KIB B'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636dfb9ae21fac2cd4510353"},
            kode_lokasi: {type: :string, example: "02.06.01.04.02"},
            nama_barang: {type: :string, example: "Kipas Angin"},
            nomor_register: {type: :string, example: "0001"},
            tipe_barang: {type: :string, example: "Harian"},
            bahan_barang: {type: :string, example: "Plastik"},
            tahun_pembelian: {type: :string, example: "2018"},
            nomor_pabrik: {type: :string, example: "SKDJ1231"},
            nomor_rangka: {type: :string, example: "MHFAB3EM1G0004620"},
            nomor_mesin: {type: :string, example: "2GDC109312"},
            nomor_polisi: {type: :string, example: "D 2019 SFC"},
            asal_usul: {type: :string, example: "APBD"},
            harga_barang: {type: :string, example: "Rp. 250000"},
            keterangan: {type: :string, example: "Barang Kurang Baik"},
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
                  response_message: {type: :string, example: "Id tidak dapat ditemukan!"},
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

  path '/v1/kib/kibb/delete' do
    post 'Delete KIB B' do
      tags 'KIB B'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636dfb9ae21fac2cd4510353"}
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibb/findAll' do
    get 'Find All KIB B' do
      tags 'KIB B'
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

  #===========================KIB C==============================
  path '/v1/kib/kibc/create' do
    post 'Create KIB C' do
      tags 'KIB C'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          kode_lokasi: {type: :string, example: "01.02.03.04.05"},
          nama_barang: {type: :string, example: "Rumah"},
          nomor_register: {type: :string, example: "0001"},
          kondisi_bangunan: {type: :string, example: "B"},
          tingkat_bangunan: {type: :string, example: "Bertingkat"},
          beton_bangunan: {type: :string, example: "Beton"},
          luas_lantai: {type: :string, example: "20m2"},
          alamat: {type: :string, example: "Bandung"},
          dokumen_gedung: {type: :string, example: "1000/13012001"},
          luas: {type: :string, example: "20m2"},
          status: {type: :string, example: "AJB"},
          nomor_tanah: {type: :string, example: "32155324"},
          asal_usul: {type: :string, example: "APBD"},
          harga: {type: :string, example: "Rp. 1000000000"},
          keterangan: {type: :string, example: "Layak Huni"},
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
                  response_message: {type: :string, example: "Kesalahan Parameter"},
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

  path '/v1/kib/kibc/search' do
    post 'Search KIB C' do
      tags 'KIB C'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            keywords: {type: :string, example: "Rumah"},
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibc/edit' do
    post 'Edit KIB C' do
      tags 'KIB C'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636e51c8e21fac163c3e0cc7"},
            kode_lokasi: {type: :string, example: "03.02.01.04.05"},
            nama_barang: {type: :string, example: "Rumah"},
            nomor_register: {type: :string, example: "0002"},
            kondisi_bangunan: {type: :string, example: "KB"},
            tingkat_bangunan: {type: :string, example: "Tidak"},
            beton_bangunan: {type: :string, example: "Tidak"},
            luas_lantai: {type: :string, example: "20m2"},
            alamat: {type: :string, example: "Bandung"},
            dokumen_gedung: {type: :string, example: "1000/13012001"},
            luas: {type: :string, example: "20m2"},
            status: {type: :string, example: "HGB"},
            nomor_tanah: {type: :string, example: "32155324"},
            asal_usul: {type: :string, example: "APBD"},
            harga: {type: :string, example: "Rp. 1000000000"},
            keterangan: {type: :string, example: "Layak Huni"},
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
                  response_message: {type: :string, example: "Id tidak dapat ditemukan!"},
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

  path '/v1/kib/kibc/delete' do
    post 'Delete KIB C' do
      tags 'KIB C'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636e51c8e21fac163c3e0cc7"}
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibc/findAll' do
    get 'Find All KIB C' do
      tags 'KIB C'
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

  #===========================KIB D==============================
  path '/v1/kib/kibd/create' do
    post 'Create KIB D' do
      tags 'KIB D'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          kode_lokasi: {type: :string, example: "01.02.03.04.05"},
          nama_barang: {type: :string, example: "Rumah"},
          nomor_register: {type: :string, example: "0001"},
          konstruksi: {type: :string, example: "Bangunan"},
          panjang: {type: :string, example: "5m"},
          lebar: {type: :string, example: "5m"},
          luas: {type: :string, example: "25m2"},
          nomor_dokumen: {type: :string, example: "14343322"},
          tanggal_dokumen: {type: :string, example: "13/12/2022"},
          status: {type: :string, example: "AJB"},
          nomor_tanah: {type: :string, example: "32155324"},
          asal_usul: {type: :string, example: "APBD"},
          harga: {type: :string, example: "Rp. 100000000"},
          kondisi: {type: :string, example: "KB"},
          keterangan: {type: :string, example: "Layak Huni"},
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
                  response_message: {type: :string, example: "Kesalahan Parameter"},
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

  path '/v1/kib/kibd/search' do
    post 'Search KIB D' do
      tags 'KIB D'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            keywords: {type: :string, example: "Rumah"},
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibd/edit' do
    post 'Edit KIB D' do
      tags 'KIB D'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636e5ae2e21fac2f6846f8d7"},
            kode_lokasi: {type: :string, example: "01.02.03.04.05"},
            nama_barang: {type: :string, example: "Rumah"},
            nomor_register: {type: :string, example: "0001"},
            konstruksi: {type: :string, example: "Bangunan"},
            panjang: {type: :string, example: "5m"},
            lebar: {type: :string, example: "5m"},
            luas: {type: :string, example: "25m2"},
            nomor_dokumen: {type: :string, example: "14343322"},
            tanggal_dokumen: {type: :string, example: "13/12/2022"},
            status: {type: :string, example: "AJB"},
            nomor_tanah: {type: :string, example: "32155324"},
            asal_usul: {type: :string, example: "APBD"},
            harga: {type: :string, example: "Rp. 100000000"},
            kondisi: {type: :string, example: "KB"},
            keterangan: {type: :string, example: "Layak Huni"},
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
                  response_message: {type: :string, example: "Id tidak dapat ditemukan!"},
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

  path '/v1/kib/kibd/delete' do
    post 'Delete KIB D' do
      tags 'KIB D'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636e5ae2e21fac2f6846f8d7"}
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibd/findAll' do
    get 'Find All KIB D' do
      tags 'KIB D'
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

  #===========================KIB E==============================
  path '/v1/kib/kibe/create' do
    post 'Create KIB E' do
      tags 'KIB E'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          kode_lokasi: {type: :string, example: "5.2.05.01.01.001"},
          nama_barang: {type: :string, example: "Agama Islam"},
          nomor_register: {type: :string, example: "001"},
          judul_buku: {type: :string, example: "Ahmad Dahlan"},
          spesifikasi_buku: {type: :string, example: "Kertas HVS 70 gr"},
          asal_kesenian: {type: :string, example: "-"},
          pencipta_kesenian: {type: :string, example: "Ahmad Dahlan"},
          bahan_kesenian: {type: :string, example: "-"},
          jenis: {type: :string, example: "-"},
          jumlah: {type: :string, example: "1"},
          ukuran: {type: :string, example: "-"},
          tahun_pembelian: {type: :string, example: "2021"},
          asal_usul: {type: :string, example: "APBD"},
          harga: {type: :string, example: "Rp. 23000"},
          keterangan: {type: :string, example: "-"},
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
                  response_message: {type: :string, example: "Kesalahan Parameter"},
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

  path '/v1/kib/kibe/search' do
    post 'Search KIB E' do
      tags 'KIB E'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            keywords: {type: :string, example: "Buku"},
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibe/edit' do
    post 'Edit KIB E' do
      tags 'KIB E'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          id: {type: :string, example: "636e72bbe21fac2f6846f8e3"},
          kode_lokasi: {type: :string, example: "5.2.05.01.01.002"},
          nama_barang: {type: :string, example: "Sejarah"},
          nomor_register: {type: :string, example: "002"},
          judul_buku: {type: :string, example: "Sembada"},
          spesifikasi_buku: {type: :string, example: "Novel"},
          asal_kesenian: {type: :string, example: "-"},
          pencipta_kesenian: {type: :string, example: "Pembada"},
          bahan_kesenian: {type: :string, example: "Buku"},
          jenis: {type: :string, example: "Fiksi"},
          jumlah: {type: :string, example: "2"},
          ukuran: {type: :string, example: "15x20 cm"},
          tahun_pembelian: {type: :string, example: "2017"},
          asal_usul: {type: :string, example: "APBD"},
          harga: {type: :string, example: "Rp. 48000"},
          keterangan: {type: :string, example: "-"},
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
                  response_message: {type: :string, example: "Id tidak dapat ditemukan!"},
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

  path '/v1/kib/kibe/delete' do
    post 'Delete KIB E' do
      tags 'KIB E'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636e72bbe21fac2f6846f8e3"}
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibe/findAll' do
    get 'Find All KIB E' do
      tags 'KIB E'
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
  #===========================KIB F==============================
  path '/v1/kib/kibf/create' do
    post 'Create KIB F' do
      tags 'KIB F'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          kode_lokasi: {type: :string, example: "03.02.01.04.05"},
          nama_barang: {type: :string, example: "Rumah"},
          nomor_register: {type: :string, example: "0002"},
          bangunan: {type: :string, example: "S"},
          tingkat_bangunan: {type: :string, example: "Tidak"},
          beton_bangunan: {type: :string, example: "Tidak"},
          luas: {type: :string, example: "20m2"},
          alamat: {type: :string, example: "Kosambi"},
          nomor_dokumen: {type: :string, example: "12312412"},
          tanggal_dokumen: {type: :string, example: "13/01/2001"},
          tanggal_mulai: {type: :string, example: "13/01/2001"},
          status: {type: :string, example: "HGB"},
          nomor_tanah: {type: :string, example: "32155324"},
          asal_usul: {type: :string, example: "APBD"},
          nilai_kontrak: {type: :string, example: "Rp. 10000"},
          keterangan: {type: :string, example: "Layak Huni"},
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
                  response_message: {type: :string, example: "Kesalahan Parameter"},
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

  path '/v1/kib/kibf/search' do
    post 'Search KIB F' do
      tags 'KIB F'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            keywords: {type: :string, example: "Rumah"},
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibf/edit' do
    post 'Edit KIB F' do
      tags 'KIB F'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
          id: {type: :string, example: "636e6497e21fac2f6846f8db"},
          kode_lokasi: {type: :string, example: "03.02.01.04.05"},
          nama_barang: {type: :string, example: "Rumah"},
          nomor_register: {type: :string, example: "0002"},
          bangunan: {type: :string, example: "S"},
          tingkat_bangunan: {type: :string, example: "Tidak"},
          beton_bangunan: {type: :string, example: "Tidak"},
          luas: {type: :string, example: "20m2"},
          alamat: {type: :string, example: "Kosambi"},
          nomor_dokumen: {type: :string, example: "12312412"},
          tanggal_dokumen: {type: :string, example: "13/01/2001"},
          tanggal_mulai: {type: :string, example: "13/01/2001"},
          status: {type: :string, example: "HGB"},
          nomor_tanah: {type: :string, example: "32155324"},
          asal_usul: {type: :string, example: "APBD"},
          nilai_kontrak: {type: :string, example: "Rp. 10000"},
          keterangan: {type: :string, example: "Layak Huni"},
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
                  response_message: {type: :string, example: "Id tidak dapat ditemukan!"},
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

  path '/v1/kib/kibf/delete' do
    post 'Delete KIB F' do
      tags 'KIB F'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "636e6497e21fac2f6846f8db"}
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
                  response_message: {type: :string, example: "Barang tidak dapat ditemukan!"},
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

  path '/v1/kib/kibf/findAll' do
    get 'Find All KIB F' do
      tags 'KIB F'
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
