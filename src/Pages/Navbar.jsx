import React, { useEffect, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography, CssBaseline, useTheme, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';


export default function Navbar() {
  const theme = useTheme();
  const location = useLocation();

  // State to store user information
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Retrieve user information from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };
const logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ19ir9fXIGAKncFyFgjSNjOAPKSsi9Ri6hDgchPi-1hxZ_neF0XzrpK892m7T95m_sfSM&usqp=CAU'; 

  // Determine if the current path should hide the navbar
  const hideNavbarPaths = ['/', '/login', '/signup'];
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: theme.palette.primary.main, height: '100px', justifyContent: 'center' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img src={logo} alt="logo" style={{ height: '60px', marginRight: '10px', borderRadius: '30px' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Employee Management System
              </Typography>
            </Box>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <>
                    <Button
                      component={Link}
                      to="/dashboard"
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: 'bold',
                        mx: 2,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: theme.palette.grey[300],
                        },
                      }}
                    >
                      Dashboard
                    </Button>
                    <Button
                      component={Link}
                      to="/form"
                      sx={{
                        color: theme.palette.common.white,
                        fontWeight: 'bold',
                        mx: 2,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: theme.palette.grey[300],
                        },
                      }}
                    >
                      Registration Form
                    </Button>
                  </>
                )}
                {user.role === 'employee' && (
                  <Button
                    component={Link}
                    to="/dashboard"
                    sx={{
                      color: theme.palette.common.white,
                      fontWeight: 'bold',
                      mx: 2,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: theme.palette.grey[300],
                      },
                    }}
                  >
                    Dashboard
                  </Button>
                )}
    
<Box
  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 1, cursor: 'pointer' }}
  onClick={handleMenu}
>
  <Avatar
    alt={user.username}
    src={user.avatarUrl} 
    sx={{ width: 56, height: 56 }}
  />
  <Typography 
    variant="body1" 
    sx={{ color: 'common.black', mt: 0.5, textAlign: 'center' }}
  >
    {user.username} ({user.role})
  </Typography>

</Box>
<Menu
  id="menu-appbar"
  anchorEl={anchorEl}
  anchorOrigin={{
    vertical: 'bottom', 
    horizontal: 'right',
  }}
  keepMounted
  transformOrigin={{
    vertical: 'top', 
    horizontal: 'right',
  }}
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
</Menu>
            
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: 'bold',
                    mx: 2,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[300],
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  sx={{
                    color: theme.palette.common.white,
                    fontWeight: 'bold',
                    mx: 2,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: theme.palette.grey[300],
                    },
                  }}
                >
                  Signup
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
