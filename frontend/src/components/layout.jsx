/**
 * 
 *  Layout component
 *  Basic layout for most of user interface design.
 *  
 * Structure:
 * 1. navbar
 * 2.1 Sidebar
 * 2.2 Content 
 * 
 */

import React from 'react';
import { Box, IconButton, Container, Typography } from "@mui/material";
import { Box as BoxFeather, FilePlus, FileText, Home, Menu } from "react-feather";
import { useLocation, Outlet } from "react-router-dom";

import Navbar from './navbar';
import Sidebar from './sidebar';


const Layout = () => {
    const menuLists = [
        { name: "Dashboard", url: "/", icon: <Home size={20}/> },
        { name: "Pendataan", url: "/pendataan", icon: <FilePlus size={20}/> },
        { name: "Pencatatan", url: "/pencatatan", icon: <BoxFeather size={20}/> },
        { name: "Pelaporan", url: "/pelaporan", icon: <FileText size={20}/> }
    ];

    const location = useLocation();
    const currentLocationData = menuLists.reduce((result, item)=> item.url === location.pathname ? [...result, item] : result, []);

    return (
        <Container
            disableGutters
            maxWidth="100vw"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}>
            <Navbar />
            <Container
                disableGutters
                maxWidth="100vw"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height:'calc(100vh - 71px)',
                }}
            >
                <Sidebar menu={menuLists}/>
                <Box sx={{ width: '100%', overflowY: 'auto'}}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 1,
                            px: 5,
                            py:3,
                            color: 'themeGrey.darkest',
                        }}
                    >
                        <IconButton aria-label="Menu" sx={{color:'themePrimary.main'}}><Menu size={20} /></IconButton>
                        {currentLocationData[0].icon}
                        <Typography variant="h2">{currentLocationData[0].name}</Typography>
                    </Box>
                    <Box sx={{ width: '100%', overflowY: 'auto' }}>
                        <Outlet />
                    </Box>
                </Box>
            </Container>
        </Container>
    )
}

export default Layout;