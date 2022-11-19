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

import Sidebar from './sidebar';

const Layout = () => {
    return (
        <Container
            disableGutters
            maxWidth="100vw"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                height: '100vh'
            }}>
            <Sidebar />
            <Box sx={{ width: '100%', overflowY: 'auto' }}>
                <Outlet />
            </Box>
        </Container>
    )
}

export default Layout;