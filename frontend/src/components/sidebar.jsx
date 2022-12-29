/**
 * 
 * Sidebar component
 * Should be able to be a component for admin and nonadmin pages (conditional menus and urls)
 * 
*/

import { Box, List, ListItemButton, ListItemIcon, ListItemText, Collapse, Divider, Popover } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import "../assets/css/scrollbar.css";

const Sidebar = ({ menu, size }) => {
    // Route-related functions 
    const navigate = useNavigate();
    const location = useLocation();

    const SingleList = ({ data, keys, sx, minimize }) => {
        return (
            <ListItemButton
                key={keys}
                onClick={() => navigate(data.url)}
                sx={[{ backgroundColor: location.pathname === data.url ? "themePrimary.darkest" : "transparent", borderRadius: '5px', color: 'themeWhite.lightest' }, sx]}
            >
                {data.icon && <ListItemIcon>{data.icon}</ListItemIcon>}
                {minimize && <ListItemText>{data.name}</ListItemText>}
            </ListItemButton>
        );
    }

    const MultiList = ({ data, keys, minimize }) => {
        const [collapse, setCollapse] = useState(false);
        const [anchorEl, setAnchorEl] = useState(null);
        const handleClick = (e) => {
            setAnchorEl(e.currentTarget);
        }

        const handleClose = () => {
            setAnchorEl(null);
        }

        const open = Boolean(anchorEl);
        const id = open ? 'popover-menu' : undefined;

        return (
            <div key={keys}>
                <ListItemButton onClick={minimize ? () => setCollapse(!collapse) : handleClick}>
                    <ListItemIcon>{data.icon}</ListItemIcon>
                    {minimize && <ListItemText>{data.name}</ListItemText>}
                    {minimize && (collapse ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
                </ListItemButton>
                {!minimize ?
                    <Popover id={id} open={open} onClose={handleClose} anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <List component="div" disablePadding sx={{ backgroundColor: '#00823F' }}>
                            {data.child.map((subMenu, index) => {
                                return (
                                    subMenu.hasOwnProperty('child') ?
                                        <MultiList keys={index + subMenu.name + "sub"} data={subMenu} key={index + subMenu.name + "sub"} minimize={true} /> :
                                        <SingleList keys={index + subMenu.name + "sub"} data={subMenu} key={index + subMenu.name + "sub"} minimize={true} />
                                )
                            })}
                        </List>
                    </Popover> :
                    <Collapse in={collapse} unmountOnExit>
                        <List component="div" disablePadding sx={{ backgroundColor: '#00823F', borderRadius: '5px' }}>
                            {data.child.map((subMenu, index) => {
                                return (
                                    subMenu.hasOwnProperty('child') ? <MultiList keys={index + subMenu.name + "sub"} data={subMenu} key={index + subMenu.name + "sub"} minimize={minimize} /> : <SingleList data={subMenu} keys={index + subMenu.name + "sub"} sx={{ pl: 4 }} key={index + subMenu.name + "sub"} minimize={minimize} />
                                )
                            })}
                        </List>
                    </Collapse>
                }
            </div>
        );
    }
    return (
        <React.Fragment>
            <Box
                className="hidden-scrollbar hidden-scrollbar__scrollbar hidden-scrollbar__scrollbar-thumb hidden-scrollbar__scrollbar-track"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: size ? "21.25rem" : "unset",
                    backgroundColor: 'themePrimary.main',
                    color: 'themeWhite.lightest',
                    overflowY: 'scroll',
                    height: '100%'
                }}
            >
                <List
                    sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                    {menu.map((data, index) => {
                        return (data.hasOwnProperty('child') ? <MultiList keys={index + data.name} data={data} key={index + data.name} minimize={size} /> : <SingleList keys={index + data.name} data={data} key={index + data.name} minimize={size} />);
                    })}
                </List>
            </Box>
        </React.Fragment>
    )
}

export default Sidebar;