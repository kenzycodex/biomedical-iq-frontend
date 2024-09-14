import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { fetchUserProfile, logout } from '../api/auth';
import { mainListItems } from './dashboard/listItems';
import { LoadingOverlay, ErrorDisplay } from './dashboard/UIComponents';
import MainContent from './dashboard/MainContent';
import ProfilePage from './dashboard/ProfilePage';
import EquipmentAnalysis from './dashboard/EquipmentAnalysis';
import Maintenance from './dashboard/Maintenance';
import Alerts from './dashboard/Alerts';
import Settings from './dashboard/Settings';

const drawerWidth = 300;

const darkBlueTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1a237e', // Dark blue
    },
    secondary: {
      main: '#3949ab', // Lighter blue
    },
    background: {
      default: '#0a0e21', // Very dark blue
      paper: '#1a237e', // Dark blue
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const isSmallScreen = useMediaQuery(darkBlueTheme.breakpoints.down('md'));

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to login page or update app state
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (isSmallScreen) {
      setMobileOpen(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <MainContent userData={userData} />;
      case 'profile':
        return <ProfilePage userData={userData} setUserData={setUserData} />;
      case 'equipment':
        return <EquipmentAnalysis />;
      case 'maintenance':
        return <Maintenance />;
      case 'alerts':
        return <Alerts />;
      case 'settings':
        return <Settings />;
      default:
        return <MainContent userData={userData} />;
    }
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  const drawer = (
    <div>
      <Toolbar>
        <Avatar alt={userData?.full_name} src="/static/images/avatar/1.jpg" />
        <Typography variant="h6" noWrap sx={{ ml: 2 }}>
          {userData?.full_name}
        </Typography>
      </Toolbar>
      <Divider />
      <List>{mainListItems(handlePageChange, currentPage)}</List>
    </div>
  );

  return (
    <ThemeProvider theme={darkBlueTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </Typography>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant={isSmallScreen ? 'temporary' : 'permanent'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {renderPage()}
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handlePageChange('profile')}>Profile</MenuItem>
        <MenuItem onClick={() => handlePageChange('settings')}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </ThemeProvider>
  );
};

export default Dashboard;