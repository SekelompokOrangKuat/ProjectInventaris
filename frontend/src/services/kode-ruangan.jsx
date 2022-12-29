let token = localStorage.getItem('token');

async function getAllRuangan() {

    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/ruangans/findAll",
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization": token,
            }
        })
}

async function deleteRuangan(id) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/ruangans/delete",
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
                _id: id
            })
        });
}

async function editRuangan(id) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/ruangans/edit",
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
                _id: id
            })
        });
}

async function createRuangan(nama_ruangan, bidang_ruangan, kelompok_ruangan) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/ruangans/create",
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
                nama_ruangan: nama_ruangan,
                bidang_ruangan: bidang_ruangan,
                kelompok_ruangan: kelompok_ruangan
            })
        });
}

async function searchRuangan(keywords) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/ruangan/ruangans/create",
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
                keywords: keywords
            })
        });
}

export { getAllRuangan, createRuangan, deleteRuangan, editRuangan, searchRuangan }