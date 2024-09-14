import React from 'react';
import { Box, Typography, CircularProgress, Alert, Backdrop } from '@mui/material';
import { styled } from '@mui/material/styles';

const FullScreenBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.drawer + 1,
}));

export const LoadingOverlay = ({ message = 'Loading...' }) => (
  <Backdrop open={true} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Box sx={{ textAlign: 'center' }}>
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
        {message}
      </Typography>
    </Box>
  </Backdrop>
);

export const ErrorDisplay = ({ message, onRetry }) => (
  <FullScreenBox>
    <Alert
      severity="error"
      variant="filled"
      sx={{
        maxWidth: 400,
        width: '90%',
      }}
    >
      <Typography variant="h6">Error</Typography>
      <Typography variant="body1">{message}</Typography>
    </Alert>
    {onRetry && (
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={onRetry}>
          Retry
        </Button>
      </Box>
    )}
  </FullScreenBox>
);

export const EmptyState = ({ icon: Icon, message, description }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      p: 3,
      textAlign: 'center',
    }}
  >
    {Icon && <Icon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />}
    <Typography variant="h5" gutterBottom>
      {message}
    </Typography>
    {description && (
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    )}
  </Box>
);

export default {
  LoadingOverlay,
  ErrorDisplay,
  EmptyState,
};