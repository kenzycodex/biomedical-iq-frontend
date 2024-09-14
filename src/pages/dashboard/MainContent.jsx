import React from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';

const MainContent = ({ userData }) => {
  const theme = useTheme();

  const salesChartOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false,
      },
      background: 'transparent',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      title: {
        text: 'Equipment Sales',
        style: {
          color: theme.palette.text.secondary,
        },
      },
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    tooltip: {
      theme: 'dark',
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
  };

  const salesChartSeries = [
    {
      name: 'Sales',
      data: [31, 40, 28, 51, 42, 82, 56],
    },
  ];

  const topSellingProducts = [
    { name: 'Product A', sales: 5432, revenue: 654321 },
    { name: 'Product B', sales: 4321, revenue: 543210 },
    { name: 'Product C', sales: 3210, revenue: 432109 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Welcome Message */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
            <Typography variant="h5" gutterBottom>
              Welcome back, {userData?.full_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Here's what's happening with your biomedical equipment today.
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Equipment
              </Typography>
              <Typography variant="h4">1,234</Typography>
              <Typography variant="body2" color="textSecondary">
                5% increase from last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Maintenance
              </Typography>
              <Typography variant="h4">42</Typography>
              <Typography variant="body2" color="textSecondary">
                2 urgent, 40 routine
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Equipment Utilization
              </Typography>
              <Typography variant="h4">78%</Typography>
              <Typography variant="body2" color="textSecondary">
                3% increase from last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Sales Chart */}
        <Grid item xs={12}>
          <Card sx={{ bgcolor: 'background.paper' }}>
            <CardHeader
              title="Equipment Sales Overview"
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Chart options={salesChartOptions} series={salesChartSeries} type="area" height={350} />
            </CardContent>
          </Card>
        </Grid>

        {/* Top Selling Products */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: 'background.paper' }}>
            <CardHeader title="Top Selling Products" />
            <CardContent>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Product</th>
                      <th style={{ textAlign: 'right', padding: '8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Sales</th>
                      <th style={{ textAlign: 'right', padding: '8px', borderBottom: `1px solid ${theme.palette.divider}` }}>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topSellingProducts.map((product, index) => (
                      <tr key={index}>
                        <td style={{ padding: '8px', borderBottom: `1px solid ${theme.palette.divider}` }}>{product.name}</td>
                        <td style={{ textAlign: 'right', padding: '8px', borderBottom: `1px solid ${theme.palette.divider}` }}>{product.sales.toLocaleString()}</td>
                        <td style={{ textAlign: 'right', padding: '8px', borderBottom: `1px solid ${theme.palette.divider}` }}>${product.revenue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: 'background.paper' }}>
            <CardHeader title="Recent Activity" />
            <CardContent>
              <Box>
                {[
                  { time: '2 hours ago', message: 'New maintenance request for MRI machine.' },
                  { time: '5 hours ago', message: 'Equipment #1234 calibration completed.' },
                  { time: '1 day ago', message: 'Received 5 new ultrasound machines.' },
                  { time: '2 days ago', message: 'Scheduled maintenance for all X-ray machines.' },
                ].map((activity, index) => (
                  <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < 3 ? `1px solid ${theme.palette.divider}` : 'none' }}>
                    <Typography variant="body2" color="textSecondary">
                      {activity.time}
                    </Typography>
                    <Typography variant="body1">
                      {activity.message}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainContent;