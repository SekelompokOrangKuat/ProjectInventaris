let token = localStorage.getItem('token');

async function getAllKIBC() {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibc/findAll",
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

export { getAllKIBC }