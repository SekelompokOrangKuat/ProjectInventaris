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
            kode_barang: {type: :string, example: "1.3.1.01.01.04.002"},
            kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
            nama_barang: {type: :string, example: "Tanah Bangunan Kantor Pemerintah"},
            nomor_register: {type: :string, example: "0001"},
            luas: {type: :string, example: "27.600"},
            tahun_pengadaan: {type: :string, example: "1978"},
            alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6"},
            kota: {type: :string, example: "Kota Bandung"},
            status_tanah: {type: :string, example: "SHM"},
            nomor_sertifikat: {type: :string, example: "2380, 17/05/1978"},
            penggunaan: {type: :string, example: "Perkantoran"},
            asal_usul: {type: :string, example: "APBD"},
            nilai_perolehan: {type: :string, example: "31.657.200.000,00"},
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
          id: {type: :string, example: "637f70cde21fac03c0e36a91"},
          kode_barang: {type: :string, example: "1.3.1.01.01.04.003"},
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          nama_barang: {type: :string, example: "Tanah Bangunan Pendidikan dan Latihan (Sekolah)"},
          nomor_register: {type: :string, example: "0002"},
          luas: {type: :string, example: "6754"},
          tahun_pengadaan: {type: :string, example: "2017"},
          alamat: {type: :string, example: "Jl. Baturengat No. 10"},
          kota: {type: :string, example: "Kota Bandung"},
          status_tanah: {type: :string, example: "AJB"},
          nomor_sertifikat: {type: :string, example: "3231, 18/05/1978"},
          penggunaan: {type: :string, example: "Pelatihan"},
          asal_usul: {type: :string, example: "APBD"},
          nilai_perolehan: {type: :string, example: "8.686.872.550"},
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

  path '/v1/kib/kiba/delete' do
    post 'Delete KIB A' do
      tags 'KIB A'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "637f70cde21fac03c0e36a91"}
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
          kode_barang: {type: :string, example: "1.3.2.02.01.01.001"},
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          nama_barang: {type: :string, example: "Sedan"},
          nomor_register: {type: :string, example: "0001"},
          tipe_barang: {type: :string, example: "Toyota Altis"},
          ukuran_barang: {type: :string, example: "1800"},
          bahan_barang: {type: :string, example: "Besi"},
          tahun_pembelian: {type: :string, example: "2008"},
          nomor_pabrik: {type: :string, example: "Toyota"},
          nomor_rangka: {type: :string, example: "BGHF123JJHNH6354"},
          nomor_mesin: {type: :string, example: "MH1GHKHTEEYU234"},
          nomor_polisi: {type: :string, example: "D 1763 E"},
          nomor_bpkb: {type: :string, example: "L-050345455"},
          asal_usul: {type: :string, example: "APBD"},
          harga_barang: {type: :string, example: "239.000.000"},
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

  path '/v1/kib/kibb/search' do
    post 'Search KIB B' do
      tags 'KIB B'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            keywords: {type: :string, example: "Kipas Angin"},
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
            id: {type: :string, example: "637f720ce21fac03c0e36a9d"},
            kode_barang: {type: :string, example: "1.3.2.02.01.01.001"},
            kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
            nama_barang: {type: :string, example: "Jeep"},
            nomor_register: {type: :string, example: "0001"},
            tipe_barang: {type: :string, example: "Toyota Rush"},
            ukuran_barang: {type: :string, example: "1500"},
            bahan_barang: {type: :string, example: "Besi"},
            tahun_pembelian: {type: :string, example: "2010"},
            nomor_pabrik: {type: :string, example: "Toyota"},
            nomor_rangka: {type: :string, example: "BXZT123JJHNH6355"},
            nomor_mesin: {type: :string, example: "MH1GHKHTEEYU235"},
            nomor_polisi: {type: :string, example: "D 1763 E"},
            nomor_bpkb: {type: :string, example: "L-050345456"},
            asal_usul: {type: :string, example: "APBD"},
            harga_barang: {type: :string, example: "239.000.000"},
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

  path '/v1/kib/kibb/delete' do
    post 'Delete KIB B' do
      tags 'KIB B'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "637f720ce21fac03c0e36a9d"}
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
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          nama_barang: {type: :string, example: "Bangunan Olah Raga Terbuka Permanen"},
          kode_barang: {type: :string, example: "1.3.3.01.01.11.001"},
          nomor_register: {type: :string, example: "0001"},
          kondisi_bangunan: {type: :string, example: "Baik"},
          tingkat_bangunan: {type: :string, example: "tidak"},
          beton_bangunan: {type: :string, example: "tidak"},
          luas_lantai: {type: :string, example: "300"},
          alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
          nomor_dokumen: {type: :string, example: "234/pd-disdik/1996"},
          tanggal_dokumen: {type: :string, example: "17/05/1996"},
          luas: {type: :string, example: "300"},
          status: {type: :string, example: "SHM"},
          nomor_tanah: {type: :string, example: "2380"},
          asal_usul: {type: :string, example: "APBD"},
          harga: {type: :string, example: "539.064.736"},
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
            id: {type: :string, example: "637f7292e21fac03c0e36a9f"},
            kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
            nama_barang: {type: :string, example: "Bangunan Garasi/Pool Permanen"},
            kode_barang: {type: :string, example: "1.3.3.01.01.14.001"},
            nomor_register: {type: :string, example: "0001"},
            kondisi_bangunan: {type: :string, example: "Baik"},
            tingkat_bangunan: {type: :string, example: "tidak"},
            beton_bangunan: {type: :string, example: "Beton"},
            luas_lantai: {type: :string, example: "500"},
            alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
            nomor_dokumen: {type: :string, example: "110pd-disdik/1997"},
            tanggal_dokumen: {type: :string, example: "18/10/1996"},
            luas: {type: :string, example: "500"},
            status: {type: :string, example: "SHM"},
            nomor_tanah: {type: :string, example: "2380"},
            asal_usul: {type: :string, example: "APBD"},
            harga: {type: :string, example: "879.444.500"},
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

  path '/v1/kib/kibc/delete' do
    post 'Delete KIB C' do
      tags 'KIB C'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "637f7292e21fac03c0e36a9f"}
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
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          nama_barang: {type: :string, example: "Instalasi penangkal petir manual"},
          kode_barang: {type: :string, example: "1.3.2.05.01.05.084"},
          nomor_register: {type: :string, example: "0001"},
          konstruksi: {type: :string, example: "-"},
          panjang: {type: :string, example: "5.000"},
          lebar: {type: :string, example: "-"},
          luas: {type: :string, example: "-"},
          alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
          nomor_dokumen: {type: :string, example: "234/pd-disdik/1996"},
          tanggal_dokumen: {type: :string, example: "17/05/1996"},
          status: {type: :string, example: "SHM"},
          nomor_tanah: {type: :string, example: "2380"},
          asal_usul: {type: :string, example: "APBD"},
          harga: {type: :string, example: "7.500.000"},
          kondisi: {type: :string, example: "Baik"},
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
            id: {type: :string, example: "637f72f7e21fac03c0e36aa1"},
            kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
            nama_barang: {type: :string, example: "Mainframe (Komputer jaringan)"},
            kode_barang: {type: :string, example: "1.3.2.10.01.01.001"},
            nomor_register: {type: :string, example: "0001"},
            konstruksi: {type: :string, example: "-"},
            panjang: {type: :string, example: "50.000"},
            lebar: {type: :string, example: "-"},
            luas: {type: :string, example: "-"},
            alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
            nomor_dokumen: {type: :string, example: "110pd-disdik/1997"},
            tanggal_dokumen: {type: :string, example: "18/10/1997"},
            status: {type: :string, example: "SHM"},
            nomor_tanah: {type: :string, example: "2380"},
            asal_usul: {type: :string, example: "APBD"},
            harga: {type: :string, example: "59.116.000"},
            kondisi: {type: :string, example: "Baik"},
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

  path '/v1/kib/kibd/delete' do
    post 'Delete KIB D' do
      tags 'KIB D'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "637f72f7e21fac03c0e36aa1"}
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
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          kode_barang: {type: :string, example: "5.2.05.01.01.001"},
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
          id: {type: :string, example: "637f7353e21fac03c0e36aa4"},
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          kode_barang: {type: :string, example: "5.2.05.01.01.002"},
          nama_barang: {type: :string, example: "Sejarah"},
          nomor_register: {type: :string, example: "001"},
          judul_buku: {type: :string, example: "Sembada"},
          spesifikasi_buku: {type: :string, example: "Kertas HVS 70 gram"},
          asal_kesenian: {type: :string, example: "-"},
          pencipta_kesenian: {type: :string, example: "Sembada"},
          bahan_kesenian: {type: :string, example: "-"},
          jenis: {type: :string, example: "-"},
          jumlah: {type: :string, example: "2"},
          ukuran: {type: :string, example: "-"},
          tahun_pembelian: {type: :string, example: "2021"},
          asal_usul: {type: :string, example: "APBD"},
          harga: {type: :string, example: "24000"},
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
            id: {type: :string, example: "637f7353e21fac03c0e36aa4"}
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
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          kode_barang: {type: :string, example: "03.02.01.04.05"},
          nama_barang: {type: :string, example: "Gedung Kesenian"},
          nomor_register: {type: :string, example: "0002"},
          bangunan: {type: :string, example: "P"},
          tingkat_bangunan: {type: :string, example: "tidak"},
          beton_bangunan: {type: :string, example: "tidak"},
          luas: {type: :string, example: "1000"},
          alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
          nomor_dokumen: {type: :string, example: "234/pd-disdik/1996"},
          tanggal_dokumen: {type: :string, example: "17/05/1996"},
          tanggal_mulai: {type: :string, example: "12/04/1996"},
          status: {type: :string, example: "SHM"},
          nomor_tanah: {type: :string, example: "3342"},
          asal_usul: {type: :string, example: "APBD"},
          nilai_kontrak: {type: :string, example: "190.884.500"},
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
          id: {type: :string, example: "637f738fe21fac03c0e36aa6"},
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          kode_barang: {type: :string, example: "03.02.01.04.05"},
          nama_barang: {type: :string, example: "Pos Jaga"},
          nomor_register: {type: :string, example: "0002"},
          bangunan: {type: :string, example: "P"},
          tingkat_bangunan: {type: :string, example: "tidak"},
          beton_bangunan: {type: :string, example: "Beton"},
          luas: {type: :string, example: "25"},
          alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
          nomor_dokumen: {type: :string, example: "110pd-disdik/1997"},
          tanggal_dokumen: {type: :string, example: "18/10/1997"},
          tanggal_mulai: {type: :string, example: "17/09/1997"},
          status: {type: :string, example: "SHM"},
          nomor_tanah: {type: :string, example: "3552"},
          asal_usul: {type: :string, example: "APBD"},
          nilai_kontrak: {type: :string, example: "18.600.000"},
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

  path '/v1/kib/kibf/delete' do
    post 'Delete KIB F' do
      tags 'KIB F'
      consumes 'application/json'
      produces 'application/json'
      parameter name: 'Authorization', in: :header, type: :string, required: true
      parameter name: :body, in: :body, schema: {
        type: :object,
        properties: {
            id: {type: :string, example: "637f738fe21fac03c0e36aa6"}
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
