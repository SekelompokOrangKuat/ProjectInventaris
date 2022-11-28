import { useState, useEffect } from "react";
let token = localStorage.getItem('token');

const useGetPemeliharaanTotal = () => {
    const [total, setTotal] = useState([]);
    useEffect(() => {
        async function fetchData(){

            await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/find_pemeliharaan",
            {
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization" : token,
            }
        })
        .then((response) => response.json())
        .then((data)=>{setTotal(data)})
        }
        
        fetchData();
    }, [])
    return total;
}

const useGetPenghapusanTotal = () => {
    const [total, setTotal] = useState([]);
    useEffect(() => {
        async function fetchData(){

            await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengusulan/find_penghapusan",
            {
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization" : token,
            }
        })
        .then((response) => response.json())
        .then((data)=>{setTotal(data)})
        }
        
        fetchData();
    }, [])
    return total;
}

const useGetPengadaanTotal = () => {
    const [total, setTotal] = useState([]);
    useEffect(() => {
        async function fetchData(){

            await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/pengadaan/findAll",
            {
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization" : token,
            }
        })
        .then((response) => response.json())
        .then((data)=>{setTotal(data)})
        }
        
        fetchData();
    }, [])
    return total;
}
const useGetJadwal = () => {
    const [total, setTotal] = useState([]);
    useEffect(() => {
        async function fetchData(){

            await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/user/jadwal/findAll",
            {
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'X-Requested-With': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
                "Authorization" : token,
            }
        })
        .then((response) => response.json())
        .then((data)=>{setTotal(data)})
        }
        
        fetchData();
    }, [])
    return total;
}


export { useGetPemeliharaanTotal, useGetPenghapusanTotal, useGetPengadaanTotal, useGetJadwal }