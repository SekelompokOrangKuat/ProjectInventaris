let token = localStorage.getItem('token');

async function createPengusulan(nama_barang, nomor_register, nama_pengusul, jenis_usulan, kondisi_barang, keterangan, foto_barang) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/create",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                nama_barang: nama_barang,
                nomor_register: nomor_register,
                nama_pengusul: nama_pengusul,
                jenis_usulan: jenis_usulan,
                kondisi_barang: kondisi_barang,
                keterangan: keterangan,
                foto_barang: foto_barang
            })
        });
}

async function searchPenghapusan(keyword) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/search_penghapusan",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                keyword: keyword,
            })
        });
}

async function searchPemeliharaan(keyword) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/search_pemeliharaan",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                keyword: keyword,
            })
        });
}

async function searchRiwayatPenghapusan(keyword) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/search_riwayat_penghapusan",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                keyword: keyword,
            })
        });
}

async function searchRiwayatPemeliharaan(keyword) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/search_riwayat_pemeliharaan",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                keyword: keyword,
            })
        });
}

async function editPengusulan(id, nama_pengusul, kondisi_barang, keterangan, foto_barang) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/edit",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                id: id,
                nama_pengusul: nama_pengusul,
                kondisi_barang: kondisi_barang,
                keterangan: keterangan,
                foto_barang: foto_barang
            })
        });
}

async function deletePengusulan(id) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/delete",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                id: id,
            })
        });
}

async function approvalPengusulan(id, is_approve) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/approval",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                id: id,
                is_approve: is_approve
            })
        });
}

async function getAllPemeliharaan() {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/find_pemeliharaan",
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            }
        });
}

async function getAllPenghapusan() {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/find_penghapusan",
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            }
        });
}

async function getBarang(nama_barang, nomor_register) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/find_penghapusan",
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            },
            body: JSON.stringify({
                nama_barang: nama_barang,
                nomor_register: nomor_register
            })
        });
}


export { getAllPemeliharaan, getAllPenghapusan, getBarang, searchPenghapusan, searchPemeliharaan, searchRiwayatPenghapusan, searchRiwayatPemeliharaan, editPengusulan, deletePengusulan, approvalPengusulan, createPengusulan }