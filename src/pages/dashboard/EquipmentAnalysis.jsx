import React from 'react';
import { Box, Paper, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';

const data = [
  { name: 'Jan', efficiency: 65, downtime: 35 },
  { name: 'Feb', efficiency: 59, downtime: 41 },
  { name: 'Mar', efficiency: 80, downtime: 20 },
  { name: 'Apr', efficiency: 81, downtime: 19 },
  { name: 'May', efficiency: 56, downtime: 44 },
  { name: 'Jun', efficiency: 55, downtime: 45 },
  { name: 'Jul', efficiency: 40, downtime: 60 },
];

const EquipmentAnalysis = () => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      type: 'line',
      background: 'transparent',
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      categories: data.map(item => item.name),
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    legend: {
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const series = [
    {
      name: 'Efficiency',
      data: data.map(item => item.efficiency),
    },
    {
      name: 'Downtime',
      data: data.map(item => item.downtime),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Equipment Analysis
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Equipment Efficiency vs. Downtime" />
            <CardContent>
              <Chart
                options={chartOptions}
                series={series}
                type="line"
                height={400}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Equipment Usage Statistics" />
            <CardContent>
              <Typography variant="body1">
                Average usage per day: 14.5 hours
              </Typography>
              <Typography variant="body1">
                Most used equipment: MRI Scanner (18.2 hours/day)
              </Typography>
              <Typography variant="body1">
                Least used equipment: Ultrasound Machine (8.3 hours/day)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Maintenance Cost Analysis" />
            <CardContent>
              <Typography variant="body1">
                Total maintenance cost (YTD): $245,000
              </Typography>
              <Typography variant="body1">
                Highest cost equipment: CT Scanner ($78,000)
              </Typography>
              <Typography variant="body1">
                Lowest cost equipment: Blood Pressure Monitors ($2,500)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EquipmentAnalysis;