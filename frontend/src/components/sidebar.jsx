/**
 * 
 * Sidebar component
 * Should be able to be a component for admin and nonadmin pages (conditional menus and urls)
 * 
*/

import { Box, MenuItem } from "@mui/material";
import { Box as BoxFeather, FilePlus, FileText, Home } from "react-feather";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const Sidebar = () => {
    
    const menuLists = [
        { name: "Dashboard", url: "/", icon: <Home size={20} color="#E0E0E0" /> },
        { name: "Pendataan", url: "/pendataan", icon: <FilePlus size={20} color="#E0E0E0" /> },
        { name: "Pencatatan", url: "/pencatatan", icon: <BoxFeather size={20} color="#E0E0E0" /> },
        { name: "Pelaporan", url: "/pelaporan", icon: <FileText size={20} color="#E0E0E0" /> }
    ];

    // Route-related functions 
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <React.Fragment>
            <Box
                width="21.25rem"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: 'themePrimary.main',
                    p: 5
                }}
            >
                {menuLists.map((data, index) => {
                    return <MenuItem
                        key={"key" + index + "_" + data.name}
                        className="active"
                        onClick={() => { navigate(data.url) }}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: '5px',
                            backgroundColor: location.pathname === data.url ? 'themePrimary.darkest' : "transparent", /*Set active menu with darkest primary color*/
                            gap: 1,
                            color: '#E0E0E0',
                            px: 1,
                            py: '6px',
                            '&:hover': { backgroundColor: 'green', cursor: 'pointer' },
                        }}>{data.icon}{data.name}</MenuItem>
                })}
            </Box>
        </React.Fragment>
    )
}

export default Sidebar;