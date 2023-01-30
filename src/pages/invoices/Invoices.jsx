import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import InvoicesTableView from './InvoicesTableView';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
} from '../../styles/pages/PagesCommonStyle';

const Invoices = () => (
  <Box style={mainPagesLayoutStyle}>
    <Box sx={titleBoxStyle}>
      <Typography variant="h5" sx={mainPagesTitleStyle}>Invoices</Typography>
    </Box>
    <InvoicesTableView />
  </Box>
);

export default Invoices;
