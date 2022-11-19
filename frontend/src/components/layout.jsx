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
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from './navbar';
import Sidebar from './sidebar';

const Layout = () => {
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
                    height: '100%'
                }}
            >
                <Sidebar />
                <Box sx={{ width: '100%', overflowY: 'auto' }}>
                    <Outlet />
                </Box>
            </Container>
        </Container>
    )
}

export default Layout;