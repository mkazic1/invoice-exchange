import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import SellersTableView from './SellersTableView';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
} from '../../styles/pages/PagesCommonStyle';

const Sellers = () => (
  <Box style={mainPagesLayoutStyle}>
    <Box sx={titleBoxStyle}>
      <Typography variant="h5" sx={mainPagesTitleStyle}>Sellers</Typography>
    </Box>
    <SellersTableView />
  </Box>
);

export default Sellers;
