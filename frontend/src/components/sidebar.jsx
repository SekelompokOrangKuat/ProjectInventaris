/**
 * 
 * Sidebar component
 * Should be able to be a component for admin and nonadmin pages (conditional menus and urls)
 * 
*/

import { Box, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";

const Sidebar = (props) => {
    // Route-related functions 
    const navigate = useNavigate();
    const location = useLocation();
    const [showPendataan, setShowPendataan] = useState(false);
    const [showPencatatan, setShowPencatatan] = useState(false);
    console.log(showPencatatan);
    return (
        <React.Fragment>
            <Box
                width={props.size ? "21.25rem" : "unset"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: 'themePrimary.main',
                    p: 5
                }}
            >
                {props.menu.map((data, index) => {
                    return(
                        <React.Fragment>
                            <MenuItem
                                key={"key" + index + "_" + data.name}
                                className="active"
                                onClick={() => {
                                    navigate(data.url)
                                }
                                }
                                sx={{

                                    backgroundColor: location.pathname === data.url ? 'themePrimary.darkest' : "transparent", /*Set active menu with darkest primary color*/
                                    color: '#E0E0E0',
                                    px: 1,
                                    py: '6px',
                                    '&:hover': { backgroundColor: data.hasOwnProperty('child') ? 'transparent' : 'green', cursor: 'pointer' },
                                }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            borderRadius: '5px',
                                            gap: 1,
                                        }}
                                    >
                                        {data.icon}{props.size && data.name}
                                    </Box>
                                </Box>
                            </MenuItem>
                            {
                                location.pathname === "/pendataan" && data.name==="Pendataan" &&
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    backgroundColor: 'themePrimary.darkest',
                                    mt:'-16px',
                                    color:'themeGrey.lightest'
                                }}>
                                    <MenuItem onClick={() => navigate('/pendataan/pemeliharaan')}>Pemeliharaan</MenuItem>
                                    <MenuItem onClick={() => navigate('/pendataan/penghapusan')}>Penghapusan</MenuItem>
                                    <MenuItem onClick={() => navigate('/pendataan/pengadaan')}>Pengadaan</MenuItem>
                                    <MenuItem onClick={() => navigate('/pendataan/jadwal')}>Jadwal</MenuItem>
                                </Box>
                            }
                            {
                                location.pathname === "/pencatatan" && data.name ==="Pencatatan" &&
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    backgroundColor: 'themePrimary.darkest',
                                    mt:'-16px',
                                    color:'themeGrey.lightest'
                                }}>
                                    <MenuItem onClick={() => navigate('/kib/a')}>KIB A</MenuItem>
                                    <MenuItem onClick={() => navigate('/kib/b')}>KIB B</MenuItem>
                                    <MenuItem onClick={() => navigate('/kib/c')}>KIB C</MenuItem>
                                    <MenuItem onClick={() => navigate('/kib/d')}>KIB D</MenuItem>
                                    <MenuItem onClick={() => navigate('/kib/e')}>KIB E</MenuItem>
                                    <MenuItem onClick={() => navigate('/kib/f')}>KIB F</MenuItem>
                                    <MenuItem onClick={() => navigate('/pencatatan/kir')}>KIR</MenuItem>
                                    <MenuItem onClick={() => navigate('/pencatatan/mutasi-barang')}>Mutasi Barang</MenuItem>
                                    <MenuItem onClick={() => navigate('/pencatatan/peminjaman')}>Peminjaman</MenuItem>
                                </Box>
                            }
                        </React.Fragment>
                    )
                })}


            </Box>
        </React.Fragment>
    )
}

export default Sidebar;