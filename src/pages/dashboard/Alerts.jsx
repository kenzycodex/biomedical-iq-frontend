import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, ListItemIcon, Chip, Card, CardHeader, CardContent, IconButton } from '@mui/material';
import { Warning as WarningIcon, Error as ErrorIcon, Info as InfoIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const alerts = [
  { id: 1, type: 'error', message: 'MRI Machine offline', timestamp: '2023-09-14 10:30:00' },
  { id: 2, type: 'warning', message: 'X-Ray Machine maintenance due', timestamp: '2023-09-14 11:45:00' },
  { id: 3, type: 'info', message: 'New software update available', timestamp: '2023-09-14 13:15:00' },
  { id: 4, type: 'error', message: 'CT Scanner critical error', timestamp: '2023-09-14 14:30:00' },
];

const getAlertIcon = (type) => {
  switch (type) {
    case 'error':
      return <ErrorIcon color="error" />;
    case 'warning':
      return <WarningIcon color="warning" />;
    case 'info':
      return <InfoIcon color="info" />;
    default:
      return <InfoIcon />;
  }
};

const Alerts = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Alerts
      </Typography>
      <Card>
        <CardHeader
          title="Recent Alerts"
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardContent>
          <List>
            {alerts.map((alert) => (
              <ListItem
                key={alert.id}
                sx={{
                  mb: 2,
                  borderRadius: 1,
                  bgcolor: theme.palette.background.paper,
                  '&:hover': {
                    bgcolor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemIcon>{getAlertIcon(alert.type)}</ListItemIcon>
                <ListItemText
                  primary={alert.message}
                  secondary={alert.timestamp}
                  primaryTypographyProps={{ fontWeight: 'medium' }}
                />
                <Chip
                  label={alert.type.toUpperCase()}
                  color={alert.type}
                  size="small"
                  sx={{ ml: 2 }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Alerts;