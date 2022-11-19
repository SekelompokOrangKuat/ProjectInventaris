/**
 * 
 *  Navbar component
 *   
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import { ChevronDown } from "react-feather";

import NavbarLogo from '../assets/images/navbar_logo.png';

const Navbar = () => {

    // Create greeting based on time
    var today = new Date();
    var currentTime = today.getHours();
    var greetings = currentTime >= 1 && currentTime < 11 ? "Pagi" : currentTime >= 11 && currentTime < 14 ? "Siang" : currentTime >= 14 && currentTime < 18 ? "Sore" : "Malam";

    return (
        <Box
            height="4.438rem"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent:"space-between",
                px: 5,
                boxShadow: "0 4px 4px 0 rgba(0,0,0,0.15)"
            }}
        >
            <img src={NavbarLogo} loading="lazy" height="47px" width="auto" alt="Logo Provinsi Jawa Barat, Disdik Jawa Barat, dan SINBADA" />
            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                "&:hover":{
                    cursor:'pointer'
                }
            }}>
                <Typography variant="h4">Selamat {greetings}, Admin</Typography>
                <ChevronDown size={20}></ChevronDown>
            </Box>
        </Box>
    )
}

export default Navbar;