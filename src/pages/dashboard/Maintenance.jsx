import React from 'react';
import { Box, Paper, Typography, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, useTheme } from '@mui/material';
import { Build as BuildIcon, Warning as WarningIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const maintenanceTasks = [
  { id: 1, equipment: 'MRI Machine', task: 'Regular calibration', status: 'Pending', icon: <BuildIcon /> },
  { id: 2, equipment: 'X-Ray Machine', task: 'Replace filters', status: 'In Progress', icon: <WarningIcon /> },
  { id: 3, equipment: 'Ultrasound Machine', task: 'Software update', status: 'Completed', icon: <CheckCircleIcon /> },
  { id: 4, equipment: 'CT Scanner', task: 'Annual inspection', status: 'Pending', icon: <BuildIcon /> },
];

const Maintenance = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Maintenance
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h6" gutterBottom>
              Maintenance Tasks
            </Typography>
            <List>
              {maintenanceTasks.map((task, index) => (
                <React.Fragment key={task.id}>
                  <ListItem
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      bgcolor: theme.palette.action.hover,
                    }}
                  >
                    <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                      {task.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="textPrimary">
                          {task.equipment}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="textSecondary"
                          >
                            {task.task}
                          </Typography>
                          <Typography
                            sx={{ display: 'inline', ml: 1 }}
                            component="span"
                            variant="body2"
                            color={
                              task.status === 'Completed'
                                ? 'success.main'
                                : task.status === 'In Progress'
                                ? 'warning.main'
                                : 'error.main'
                            }
                          >
                            • {task.status}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < maintenanceTasks.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Maintenance;