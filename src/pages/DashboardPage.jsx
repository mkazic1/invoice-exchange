import React from 'react';
import { Box, Typography } from '@mui/material';
import { mainPagesLayoutStyle, mainPagesTitleStyle, dashboardBoxStyle } from '../styles/pages/PagesCommonStyle';

const DashboardPage = () => (
  <Box sx={mainPagesLayoutStyle}>
    <Box sx={dashboardBoxStyle}>
      <Typography variant="h4" sx={mainPagesTitleStyle}>
        Welcome to Invoice Exchange System
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.primary', textAlign: 'center' }}>
        Welcome to your invoice management dashboard. Here, you can view your recent invoices,
        manage your sellers and customers, and track your financials.
      </Typography>
    </Box>
  </Box>
);

export default DashboardPage;
