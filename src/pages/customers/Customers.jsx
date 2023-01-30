import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import CustomersTableView from './CustomersTableView';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
} from '../../styles/pages/PagesCommonStyle';

const Customers = () => (
  <Box style={mainPagesLayoutStyle}>
    <Box sx={titleBoxStyle}>
      <Typography variant="h5" sx={mainPagesTitleStyle}>Customers</Typography>
    </Box>
    <CustomersTableView />
  </Box>
);

export default Customers;
