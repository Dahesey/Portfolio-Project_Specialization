import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import SideBar from './SideBar';
import AddMember from './memberRelated/AddMember';
import FrontDeskHomePage from './FrontDeskHomePage';
import AccountMenu from '../../components/AccountMenu';

const FrontDeskDashboard = () => {
    const [open, setOpen] = useState(false);

    // Toggle the drawer open/close state
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                           FrontDesk Dashboard 
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={open ? styles.drawerOpen : styles.drawerClosed}
                >
                    <Toolbar sx={styles.toolbar}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {/* Pass the open state to SideBar */}
                        <SideBar isSidebarExpanded={open} />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.mainContent}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<FrontDeskHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/FrontDesk/Membership" element={<AddMember />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default FrontDeskDashboard;

const styles = {
    mainContent: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerOpen: {
        display: "flex",
    },
    drawerClosed: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}

