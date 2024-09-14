import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import BuildIcon from '@mui/icons-material/Build';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';

export const mainListItems = (handlePageChange, currentPage) => (
  <React.Fragment>
    <ListItemButton
      onClick={() => handlePageChange('dashboard')}
      selected={currentPage === 'dashboard'}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
      }}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton
      onClick={() => handlePageChange('equipment')}
      selected={currentPage === 'equipment'}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
      }}
    >
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Equipment Analysis" />
    </ListItemButton>
    <ListItemButton
      onClick={() => handlePageChange('maintenance')}
      selected={currentPage === 'maintenance'}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
      }}
    >
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Maintenance" />
    </ListItemButton>
    <ListItemButton
      onClick={() => handlePageChange('alerts')}
      selected={currentPage === 'alerts'}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
      }}
    >
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Alerts" />
    </ListItemButton>
    <ListItemButton
      onClick={() => handlePageChange('settings')}
      selected={currentPage === 'settings'}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
      }}
    >
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <ListItemButton
      onClick={() => handlePageChange('profile')}
      selected={currentPage === 'profile'}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
          },
        },
      }}
    >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    {/* Add any secondary list items here if needed */}
  </React.Fragment>
);