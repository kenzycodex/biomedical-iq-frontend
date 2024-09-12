import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Button, Container, Grid, Paper, Avatar,
  List, ListItem, ListItemIcon, ListItemText, Tabs, Tab, TextField,
  CircularProgress, Snackbar, IconButton, Fade, Grow, Zoom
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  ExitToApp as LogoutIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Timeline as TimelineIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { fetchUserProfile, logout, updateUserProfile } from '../api/auth';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create(['box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: 'auto',
  marginBottom: theme.spacing(2),
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    width: 130,
    height: 130,
  },
}));

const LoadingSpinner = () => (
  <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Container>
);

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUserProfile();
      setUserData(data);
      setEditedData(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      } else {
        setError(error?.message || 'Failed to load user data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      navigate('/login');
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleSave = async () => {
    try {
      const updatedData = await updateUserProfile(editedData);
      setUserData(updatedData);
      setIsEditing(false);
      setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
      fetchUserData(); // Reload user data
    } catch (error) {
      setError(error?.response?.data?.message || 'Failed to update profile');
      setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
    }
  };

  const handleInputChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <Container>
        <Typography color="error" variant="h6">{error}</Typography>
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container>
        <Typography color="warning" variant="h6">No user data available.</Typography>
      </Container>
    );
  }

  return (
    <Fade in={true} timeout={1000}>
      <div>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Biomedical IQ Dashboard
            </Typography>
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Welcome, {userData.full_name}
            </Typography>
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grow in={true} timeout={1000}>
              <Grid item xs={12} md={4} lg={3}>
                <StyledPaper elevation={3}>
                  <AnimatedAvatar sx={{ bgcolor: 'primary.main' }}>
                    {userData.full_name.charAt(0)}
                  </AnimatedAvatar>
                  <List>
                    <ListItem>
                      <ListItemIcon><PersonIcon /></ListItemIcon>
                      <ListItemText primary={userData.full_name} secondary="Full Name" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><EmailIcon /></ListItemIcon>
                      <ListItemText primary={userData.email} secondary="Email" />
                    </ListItem>
                    {userData.phone_number && (
                      <ListItem>
                        <ListItemIcon><PhoneIcon /></ListItemIcon>
                        <ListItemText primary={userData.phone_number} secondary="Phone" />
                      </ListItem>
                    )}
                    {userData.organization_name && (
                      <ListItem>
                        <ListItemIcon><BusinessIcon /></ListItemIcon>
                        <ListItemText primary={userData.organization_name} secondary="Organization" />
                      </ListItem>
                    )}
                  </List>
                </StyledPaper>
              </Grid>
            </Grow>
            <Grid item xs={12} md={8} lg={9}>
              <StyledPaper elevation={3}>
                <Tabs 
                  value={activeTab} 
                  onChange={handleTabChange} 
                  aria-label="dashboard tabs"
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab label="Profile" icon={<PersonIcon />} />
                  <Tab label="Activity" icon={<TimelineIcon />} />
                  <Tab label="Settings" icon={<SettingsIcon />} />
                </Tabs>
                <Fade in={activeTab === 0} timeout={500}>
                  <div hidden={activeTab !== 0}>
                    <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>Account Information</Typography>
                    {isEditing ? (
                      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Full Name"
                          name="full_name"
                          value={editedData.full_name}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Email"
                          name="email"
                          type="email"
                          value={editedData.email}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Phone Number"
                          name="phone_number"
                          value={editedData.phone_number || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Organization Name"
                          name="organization_name"
                          value={editedData.organization_name || ''}
                          onChange={handleInputChange}
                          variant="outlined"
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          startIcon={<SaveIcon />}
                          sx={{ mt: 2 }}
                        >
                          Save
                        </Button>
                      </form>
                    ) : (
                      <Button
                        onClick={handleEdit}
                        variant="contained"
                        color="secondary"
                        startIcon={<EditIcon />}
                        sx={{ mt: 2 }}
                      >
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </Fade>
                <Fade in={activeTab === 1} timeout={500}>
                  <div hidden={activeTab !== 1}>
                    <Typography variant="h6" sx={{ mt: 2 }}>Recent Activity</Typography>
                    <Typography>No recent activity to display.</Typography>
                  </div>
                </Fade>
                <Fade in={activeTab === 2} timeout={500}>
                  <div hidden={activeTab !== 2}>
                    <Typography variant="h6" sx={{ mt: 2 }}>Account Settings</Typography>
                    <Typography>Account settings options will be available soon.</Typography>
                  </div>
                </Fade>
              </StyledPaper>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Quick Actions</Typography>
          <Grid container spacing={3}>
            {[
              { icon: <TimelineIcon />, text: 'View Activity Log' },
              { icon: <SettingsIcon />, text: 'Account Settings' },
              { icon: <HelpIcon />, text: 'Get Help' },
            ].map(({ icon, text }, index) => (
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }} key={index}>
                <Grid item xs={12} sm={6} md={4}>
                  <StyledPaper sx={{ cursor: 'pointer', textAlign: 'center', py: 3 }}>
                    {React.cloneElement(icon, { sx: { fontSize: 48, color: 'primary.main', mb: 2 } })}
                    <Typography variant="h6">{text}</Typography>
                  </StyledPaper>
                </Grid>
              </Zoom>
            ))}
          </Grid>
        </Container>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbar.message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </div>
    </Fade>
  );
};

export default Dashboard;