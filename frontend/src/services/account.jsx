let token = localStorage.getItem('token');

async function getAllAccounts() {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/registrasi/findAll",
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

async function deleteAccount(email) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/registrasi/delete",
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
                email: email
            })
        });
}

async function editAccount(id, email, user_role, nama, nip, telepon) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/registrasi/edit",
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
                email: email,
                user_role: user_role,
                nama: nama,
                nip: nip,
                telepon: telepon
            })
        });
}

async function searchAccount(keywords) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/registrasi/search",
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

async function createAccount(email, password, password_confirmation, user_role, nama, nip, telepon) {
    return await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/registrasi/create",
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
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                user_role: user_role,
                nama: nama,
                nip: nip,
                telepon: telepon
            })
        });
}

export { getAllAccounts, deleteAccount, editAccount, searchAccount, createAccount }