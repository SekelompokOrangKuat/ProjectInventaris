import { useState, useEffect } from "react";
let token = localStorage.getItem('token');

const useGetAllKibB = () => {
    const [kibB, setKibB] = useState([]);
    useEffect(() => {
        async function fetchData(){

            await fetch("https://backend.icygrass-3ea20227.eastasia.azurecontainerapps.io/v1/kib/kibb/findAll",
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
        .then((data)=>{setKibB(data.data)})
        }
        
        fetchData();
    }, [])
    return kibB;
}
// const useCreateRoom = (bidang, kelompok, nama_ruangan) => {
//     const [roomData, setRoomData] = useState([]);
//     useEffect(() => {
//         async function fetchData(){

//             await 
//         })
//         .then((response) => response.json())
//         .then((data)=>{setRoomData(data)})
//         }

//         fetchData();
//     }, [])
//     console.log(roomData);
// }

export {useGetAllKibB}