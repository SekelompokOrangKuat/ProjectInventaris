/**
 * 
 *  Navbar component
 *   
 */

import React, {useState} from "react";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { Book, ChevronDown, Settings, LogOut } from "react-feather";
import { useNavigate } from "react-router-dom";


import NavbarLogo from '../assets/images/navbar_logo.png';

const Navbar = ({user}) => {

    // Create greeting based on time
    var today = new Date();
    var currentTime = today.getHours();
    var greetings = currentTime >= 1 && currentTime < 11 ? "Pagi" : currentTime >= 11 && currentTime < 14 ? "Siang" : currentTime >= 14 && currentTime < 18 ? "Sore" : "Malam";
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget);
        setOpen(!open);
    }
    const handleClose =()=>{
        setOpen(false);
    }
    const handleopen =()=>{
        setOpen(true);
    }

    const navigate = useNavigate();
    return (
        <Box
            height="4.438rem"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-between",
                px: 5,
                boxShadow: "0 4px 4px 0 rgba(0,0,0,0.15)"
            }}
        >
            <img src={NavbarLogo} loading="lazy" height="47px" width="auto" alt="Logo Provinsi Jawa Barat, Disdik Jawa Barat, dan SINBADA" />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: 'themeGrey.darkest',
                    "&:hover": {cursor: 'pointer'}
                }}
                onClick={handleMenu}
                >
                <Typography variant="h4">Selamat {greetings}, {user.name}</Typography>
                <ChevronDown size={20}></ChevronDown>
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {user.role === "Admin" && <MenuItem onClick={()=>{navigate('/admin')}} sx={{display:'flex', flexDirection:'row', gap:2}}><Book size={20}/>Halaman Admin</MenuItem>}
                <MenuItem onClick={handleClose} sx={{display:'flex', flexDirection:'row', gap:2}}><Settings size={20}/>Pengaturan</MenuItem>
                <MenuItem onClick={handleClose} sx={{display:'flex', flexDirection:'row', gap:2}}><LogOut size={20}/>Keluar</MenuItem>
            </Menu>
        </Box>
    )
}

export default Navbar;