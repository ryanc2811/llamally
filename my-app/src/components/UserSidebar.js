import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import { styled } from "@mui/system";
import { useState } from "react";

const drawerWidth = 240;
const useStyles = styled({
    root: {
        position: "relative !important",
        "& .MuiBackdrop-root": {
            position: "relative !important",
            height: "100vh"
        }
    },
    paper: {
        position: "absolute !important"
    }
});
export default function UserSidebar() {
    const classes = useStyles();
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.paper,
                    root: classes.root,
                }}
            >
                <Toolbar />
                <Divider />
                <List>

                    <ListItem key='Dasboard' disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary='Dashboard' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key='Account' disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <LockIcon />
                            </ListItemIcon>
                            <ListItemText primary='Account' />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />

            </Box>
        </Box>
    );
}