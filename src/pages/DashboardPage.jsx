import React from 'react';
import { Box, Typography } from '@mui/material';
import { mainPagesLayoutStyle, mainPagesTitleStyle } from '../styles/CommonStyle';

export default function DashboardPage() {
  return (
    <Box sx={mainPagesLayoutStyle}>
      <Typography variant="h4" sx={mainPagesTitleStyle}>
        Dashboard page
      </Typography>
    </Box>
  );
}
