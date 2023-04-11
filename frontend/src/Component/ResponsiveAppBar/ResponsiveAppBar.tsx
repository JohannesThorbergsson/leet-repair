import AppBar from "@mui/material/AppBar";
import {Box, Container, Typography} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import {AccountCircle} from "@mui/icons-material";

export default function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const user = useAuth()
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }
    const handleLogout = () => {
        setAnchorElUser(null);
        axios.post('/api/users/logout')
            .then(() => {
                window.sessionStorage.clear();
                window.location.href = '/login'
            })
    }
    return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <BuildCircleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LeetRepair
                        </Typography>
                        <BuildCircleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LeetRepair
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            {user? <Tooltip title="Open Menu">
                                <IconButton onClick={handleOpenUserMenu}
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="open drawer"
                                            sx={{ p: 0, ml: 1 }}>
                                    <AccountCircle/>
                                </IconButton>
                            </Tooltip>:
                                <></>
                            }
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key={"logout"} onClick={handleLogout}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
    )
}
