import { Box, Grid, Typography, Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, styled, Paper, Checkbox, Link, menuItemClasses } from "@mui/material";
import { Calendar, Edit, FileText, PlusSquare, Tool, Trash2 } from "react-feather";
import React from "react";
import { useNavigate } from "react-router-dom";

const Pendataan = () => {
    const navigate = useNavigate();

    const menuData = [
        { label: 'Pemeliharaan', icon: <Tool color="white" size="100px" strokeWidth={1} />, link: () => navigate('/pendataan/pemeliharaan') },
        { label: 'Penghapusan', icon: <Trash2 color="white" size="100px" strokeWidth={1} />, link: () => navigate('/pendataan/penghapusan') },
        { label: 'Pengadaan', icon: <PlusSquare color="white" size="100px" strokeWidth={1} />, link: () => navigate('/pendataan/pengadaan') },
        { label: 'Jadwal', icon: <Calendar color="white" size="100px" strokeWidth={1} />, link: () => navigate('/pendataan/jadwal') }
    ]

    let boxItems = [];
    const boxItem = (label, icon, link) => {
        return <Grid item xs>
            <Link underline="none" onClick={link}>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        cursor: 'pointer',
                        maxWidth: '250px',
                        px: 5,
                        py: 6,
                        background: 'linear-gradient(to right, #009B4C, #007037)',
                        borderRadius: '10px',
                        boxSizing: 'border-box',
                        transition: '1s',
                        '&:hover': {
                            background: 'linear-gradient(to left, #009B4c, #007037)',
                        }
                    }}
                >
                    <Grid item>
                        {icon}
                    </Grid>
                    <Grid item>
                        <Typography variant="h2" sx={{ color: 'themeWhite.lighter' }}>{label}</Typography>
                    </Grid>
                </Grid>
            </Link>
        </Grid>
    };

    for (let i = 0; i < menuData.length; i++) {
        boxItems.push(boxItem(menuData[i].label, menuData[i].icon, menuData[i].link));
    };

    return (
        <Box
            sx={{
                width: "100%",
                m: "0",
                boxSizing: "border-box"
            }}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                width="100%"
                spacing={10}
                m="auto"
                px={8}
                pb={8}
                sx={{
                    boxSizing: 'border-box',
                }}
            >
                {boxItems}
            </Grid>
        </Box>
    )
}

export default Pendataan;