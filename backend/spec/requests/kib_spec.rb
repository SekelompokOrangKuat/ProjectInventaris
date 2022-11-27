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
            nomor_sertifikat: {type: :string, example: "2380"},
            tanggal_sertifikat: {type: :string, example: "17/05/1978"},
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
          id: {type: :string, example: "63822845e21fac0354b1693c"},
          kode_barang: {type: :string, example: "1.3.1.01.01.04.004"},
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          nama_barang: {type: :string, example: "Tanah"},
          nomor_register: {type: :string, example: "0004"},
          luas: {type: :string, example: "157,00"},
          tahun_pengadaan: {type: :string, example: "2019"},
          alamat: {type: :string, example: "jln. Husni hamid no.6"},
          kota: {type: :string, example: "Kota Bandung"},
          status_tanah: {type: :string, example: "AJB"},
          nomor_sertifikat: {type: :string, example: "3552"},
          tanggal_sertifikat: {type: :string, example: "20/05/1978"},
          penggunaan: {type: :string, example: "Gudang"},
          asal_usul: {type: :string, example: "Mutasi BPKAD"},
          nilai_perolehan: {type: :string, example: "256.001.000"},
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
            id: {type: :string, example: "63822845e21fac0354b1693c"}
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
            id: {type: :string, example: "63822c87e21fac0354b1695a"},
            kode_barang: {type: :string, example: "1.3.2.05.01.05.010"},
            kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
            nama_barang: {type: :string, example: "Penghancur Kertas"},
            nomor_register: {type: :string, example: "0001"},
            tipe_barang: {type: :string, example: "Fudfile"},
            ukuran_barang: {type: :string, example: "-"},
            bahan_barang: {type: :string, example: "Ebonit"},
            tahun_pembelian: {type: :string, example: "2021"},
            nomor_pabrik: {type: :string, example: "Secure"},
            nomor_rangka: {type: :string, example: "YTTR5656UY"},
            nomor_mesin: {type: :string, example: "-"},
            nomor_polisi: {type: :string, example: "-"},
            nomor_bpkb: {type: :string, example: "-"},
            asal_usul: {type: :string, example: "APBD"},
            harga_barang: {type: :string, example: "1.738.000"},
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
          tanggal_dokumen: {type: :string, example: "17/05/1996"},
          nomor_dokumen: {type: :string, example: "234/pd-disdik/1996"},
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
            id: {type: :string, example: "63822eb9e21fac0354b1695e"},
            kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
            nama_barang: {type: :string, example: "Bangunan Pos Jaga Permanen"},
            kode_barang: {type: :string, example: "1.3.3.91.01.13.001"},
            nomor_register: {type: :string, example: "0002"},
            kondisi_bangunan: {type: :string, example: "Baik"},
            tingkat_bangunan: {type: :string, example: "tidak"},
            beton_bangunan: {type: :string, example: "Beton"},
            luas_lantai: {type: :string, example: "16"},
            alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
            tanggal_dokumen: {type: :string, example: "20/09/2000"},
            nomor_dokumen: {type: :string, example: "876/pd-disdik/2000"},
            luas: {type: :string, example: "16"},
            status: {type: :string, example: "SHM"},
            nomor_tanah: {type: :string, example: "2380"},
            asal_usul: {type: :string, example: "APBD"},
            harga: {type: :string, example: "25.000.000"},
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
            id: {type: :string, example: "63822eb9e21fac0354b1695e"}
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
          tanggal_dokumen: {type: :string, example: "17/05/1996"},
          nomor_dokumen: {type: :string, example: "234/pd-disdik/1996"},
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
            id: {type: :string, example: "63823071e21fac0354b16962"},
            kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
            nama_barang: {type: :string, example: "Instalasi penyulingan air"},
            kode_barang: {type: :string, example: "1.3.2.14.02.01.001"},
            nomor_register: {type: :string, example: "0001"},
            konstruksi: {type: :string, example: "-"},
            panjang: {type: :string, example: "100"},
            lebar: {type: :string, example: "-"},
            luas: {type: :string, example: "-"},
            alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
            tanggal_dokumen: {type: :string, example: "18/10/1997"},
            nomor_dokumen: {type: :string, example: "110pd-disdik/1997"},
            status: {type: :string, example: "SHM"},
            nomor_tanah: {type: :string, example: "2380"},
            asal_usul: {type: :string, example: "APBD"},
            harga: {type: :string, example: "64.913.000"},
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
            id: {type: :string, example: "63823071e21fac0354b16962"}
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
          nama_barang: {type: :string, example: "Agama Islam"},
          kode_barang: {type: :string, example: "5.2.05.01.01.001"},
          nomor_register: {type: :string, example: "001"},
          judul_buku: {type: :string, example: "Ahmad Dahlan"},
          spesifikasi_buku: {type: :string, example: "Kertas HVS 70 gr"},
          asal_kesenian: {type: :string, example: "-"},
          pencipta_kesenian: {type: :string, example: "-"},
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
          id: {type: :string, example: "63823208e21fac0354b16966"},
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          nama_barang: {type: :string, example: "Sejarah"},
          kode_barang: {type: :string, example: "5.2.05.01.01.002"},
          nomor_register: {type: :string, example: "002"},
          judul_buku: {type: :string, example: "Adam toher"},
          spesifikasi_buku: {type: :string, example: "Kertas HVS 70 gram"},
          asal_kesenian: {type: :string, example: "-"},
          pencipta_kesenian: {type: :string, example: "-"},
          bahan_kesenian: {type: :string, example: "-"},
          jenis: {type: :string, example: "-"},
          jumlah: {type: :string, example: "1"},
          ukuran: {type: :string, example: "-"},
          tahun_pembelian: {type: :string, example: "2021"},
          asal_usul: {type: :string, example: "APBD"},
          harga: {type: :string, example: "27000"},
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
            id: {type: :string, example: "63823208e21fac0354b16966"}
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
          bangunan: {type: :string, example: "-"},
          tingkat_bangunan: {type: :string, example: "tidak"},
          beton_bangunan: {type: :string, example: "tidak"},
          luas: {type: :string, example: "1000"},
          alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
          tanggal_dokumen: {type: :string, example: "17/05/1996"},
          nomor_dokumen: {type: :string, example: "234/pd-disdik/1996"},
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
          id: {type: :string, example: "6382341be21fac0354b16969"},
          kode_lokasi: {type: :string, example: "11.01.32.05.000001.00020.2022"},
          kode_barang: {type: :string, example: "03.02.01.04.05"},
          nama_barang: {type: :string, example: "Kolam Renang"},
          nomor_register: {type: :string, example: "0001"},
          bangunan: {type: :string, example: "-"},
          tingkat_bangunan: {type: :string, example: "tidak"},
          beton_bangunan: {type: :string, example: "Beton"},
          luas: {type: :string, example: "500"},
          alamat: {type: :string, example: "Jl. Dr. Radjiman No. 6 Kota Bandung"},
          tanggal_dokumen: {type: :string, example: "18/10/1997"},
          nomor_dokumen: {type: :string, example: "110pd-disdik/1997"},
          tanggal_mulai: {type: :string, example: "22/08/2000"},
          status: {type: :string, example: "SHM"},
          nomor_tanah: {type: :string, example: "7652"},
          asal_usul: {type: :string, example: "APBD"},
          nilai_kontrak: {type: :string, example: "761.747.080 "},
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
            id: {type: :string, example: "6382341be21fac0354b16969"}
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
