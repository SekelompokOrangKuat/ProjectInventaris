/**
 * 
 * Dashboard page (content)
 * 
 * 
 */

import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { Calendar, FileText, Tool, Trash2, PlusSquare} from "react-feather";
import { useGetPemeliharaanTotal, useGetPengadaanTotal, useGetPenghapusanTotal, useGetJadwal } from "../services/dashboard";

const Dashboard = () => {

    var today = new Date();
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    var pemeliharaan = useGetPemeliharaanTotal();
    var penghapusan = useGetPenghapusanTotal();
    var pengadaan = useGetPengadaanTotal();
    var jadwal = useGetJadwal();

    console.log(jadwal.data[jadwal.data.length-1])


    let infographicsDatas = [
        {icon: <Tool size={50} />, title:'Pemeliharaan', amount: pemeliharaan.data != undefined ? pemeliharaan.data.pengusulan.length : "-"},
        {icon: <Trash2 size={50} />, title:'Penghapusan', amount: penghapusan.data != undefined ? penghapusan.data.pengusulan.length : "-"},
        {icon: <PlusSquare size={50} />, title:'Pengadaan', amount:pengadaan.data != undefined ? pengadaan.data.pengadaan.length : "-"}
    ]

    const sopDatas = [
        {icon: <FileText size={50}/>, title:'SOP Pengelolaan Barang Milik Daerah', url:'/pdf/mutasi'},
        {icon: <FileText size={50}/>, title:'SOP Mutasi', url:'/pdf/pengelolaan'}
    ]

    const [contentHeight, setContentHeight] = useState(0);
    const [anotherContentHeight, setAnotherContentHeight] = useState(0);
    const ref = useRef(null);
    const anotherRef = useRef(null);

    useEffect(()=>{
        setContentHeight(ref.current.clientHeight - 80);
        setAnotherContentHeight(anotherRef.current.clientHeight);
    }, []);

    return (
        <Container
            disableGutters
            maxWidth={false}
            sx={{
                width: '100%',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pb:5
                }}
            >
                {/* Information Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        pl: 5,
                        // py: 3,
                        width: '100%',
                        gap: 3,
                    }}
                    ref={ref}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            background: 'linear-gradient(to right, #009B4C, #007037)',
                            gap: 3,
                            p: 3,
                            alignItems: 'center',
                            color: 'themeWhite.lightest',
                            borderRadius: '5px'
                        }}
                    >
                        <Calendar size={50}></Calendar>
                        <Typography variant="h3">Jadwal Inventarisasi</Typography>
                        <Typography variant="h1">{jadwal.data != undefined ? jadwal.data[jadwal.data.length-1].keterangan : "-"}</Typography>
                        <Typography variant="h2">{jadwal.data != undefined ? jadwal.data[jadwal.data.length-1].tanggal : "-"}</Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 3,
                            color:'themeWhite.lightest'
                        }}
                        ref={anotherRef}
                    >
                        {infographicsDatas.map((data, index)=>
                            <Box 
                                key={index + "-" + data.title} 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    px: 3, 
                                    py: 5, 
                                    gap: 3, 
                                    width: '100%', 
                                    background: 'linear-gradient(to right, #009B4C, #007037)',
                                    borderRadius:'5px'
                                }}
                            >
                                {data.icon}
                                <Typography variant="h3">{data.title}</Typography>
                                <Typography variant="h1">{data.amount}</Typography>
                            </Box>
                        )}
                    </Box>
                </Box>

                {/* SOP Section */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        px: 5,
                        // py: 3,
                        gap: 3,
                        color:'themeWhite.lightest'
                    }}
                >
                    {sopDatas.map((data, index)=>
                        <Box
                            key={index + data.title}
                            height={index === 0? {contentHeight} : {anotherContentHeight}}
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                p:5,
                                gap:3,
                                background:'linear-gradient(to right, #009B4C, #007037)',
                                borderRadius: '5px',
                                textAlign:'center'
                            }}
                        >
                            {data.icon}
                            <Typography variant="h4">{data.title}</Typography>
                            <Button variant="contained" onClick={()=>window.open(data.url, '_blank')}>Lihat SOP</Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    )
}

export default Dashboard;