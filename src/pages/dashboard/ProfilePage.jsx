import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, Avatar, IconButton } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { updateUserProfile } from '../../api/auth';

const ProfilePage = ({ userData, setUserData }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: userData.full_name,
    username: userData.username,
    email: userData.email,
    organization_name: userData.organization_name,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
 const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Make sure formData is populated with the correct data before the API call
  if (!formData || Object.keys(formData).length === 0) {
    console.error('Form data is empty or not properly populated.');
    return;
  }

  try {
    // Await the API call to update the user profile
    const updatedUser = await updateUserProfile(formData);

    // Check if the response is valid and the update was successful
    if (!updatedUser) {
      console.error('Failed to update profile. No response from the server.');
      return;
    }

    // Update the user data in the state with the updated profile data
    setUserData(updatedUser);

    // Exit the edit mode (assuming editMode controls the form view)
    setEditMode(false);
  } catch (error) {
    // Handle any errors from the API call
    console.error('Error updating profile:', error);
  }
};
  
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            alt={userData.full_name}
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {userData.full_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            {userData.organization_name}
          </Typography>
        </Box>
        {editMode ? (
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Organization Name"
                  name="organization_name"
                  value={formData.organization_name}
                  onChange={handleChange}
                  variant="filled"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button onClick={() => setEditMode(false)} startIcon={<CancelIcon />} sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                Save Changes
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Username:</strong> {userData.username}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Email:</strong> {userData.email}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <strong>Organization:</strong> {userData.organization_name}
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;