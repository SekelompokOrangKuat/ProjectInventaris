/**
 * 
 * Sidebar component
 * Should be able to be a component for admin and nonadmin pages (conditional menus and urls)
 * 
*/

import { Box, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

const Sidebar = (props) => {
    // Route-related functions 
    const navigate = useNavigate();
    const location = useLocation();
    
    return (
        <React.Fragment>
            <Box
                width={props.size? "21.25rem": "unset"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    backgroundColor: 'themePrimary.main',
                    p: 5
                }}
            >
                {props.menu.map((data, index) => {
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
                        }}>{data.icon}{props.size && data.name}</MenuItem>
                })}
            </Box>
        </React.Fragment>
    )
}

export default Sidebar;