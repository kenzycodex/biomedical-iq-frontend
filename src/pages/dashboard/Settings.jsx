import React, { useState } from 'react';
import { Box, Paper, Typography, Switch, FormControlLabel, Divider, Button, Card, CardHeader, CardContent, Grid, Snackbar, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Settings = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: theme.palette.mode === 'dark',
    autoUpdate: true,
    dataSharing: false,
    twoFactorAuth: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (event) => {
    setSettings({ ...settings, [event.target.name]: event.target.checked });
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Settings saved:', settings);
    setSnackbar({
      open: true,
      message: 'Settings saved successfully',
      severity: 'success',
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Card>
        <CardHeader title="Application Settings" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications}
                    onChange={handleChange}
                    name="notifications"
                  />
                }
                label="Enable Notifications"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.darkMode}
                    onChange={handleChange}
                    name="darkMode"
                  />
                }
                label="Dark Mode"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoUpdate}
                    onChange={handleChange}
                    name="autoUpdate"
                  />
                }
                label="Auto-update Dashboard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.dataSharing}
                    onChange={handleChange}
                    name="dataSharing"
                  />
                }
                label="Allow Data Sharing"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={handleChange}
                    name="twoFactorAuth"
                  />
                }
                label="Enable Two-Factor Authentication"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Settings
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;