let token = localStorage.getItem('token');

async function getAllGoods() {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/admin/kb/findAll",
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

async function deleteGoods(id) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/admin/kb/delete",
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
                id: id
            })
        });
}

async function searchGoods(keywords) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/admin/kb/search",
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

export { getAllGoods, deleteGoods, searchGoods }