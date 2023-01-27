import React from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { AddBox, Delete, Edit } from '@mui/icons-material';
import SellersTableView from './SellersTableVies';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
  buttonsBoxStyle,
} from '../../styles/pages/PagesCommonStyle';

const Sellers = () => (
  <Box style={mainPagesLayoutStyle}>
    <Box sx={titleBoxStyle}>
      <Typography variant="h6" sx={mainPagesTitleStyle}>Sellers</Typography>
      <Tooltip title="Add new seller">
        <Button
          startIcon={<AddBox />}
          size="medium"
          variant="contained"
          type="submit"
        >
          Add new seller
        </Button>
      </Tooltip>
    </Box>
    <Box sx={buttonsBoxStyle}>
      <Tooltip title="Edit seller">
        <Button
          startIcon={<Edit />}
          size="medium"
          variant="contained"
          sx={{ marginRight: '10px' }}
        >
          Edit
        </Button>
      </Tooltip>
      <Tooltip title="Delete seller">
        <Button
          startIcon={<Delete />}
          size="medium"
          variant="contained"
        >
          Delete
        </Button>
      </Tooltip>
    </Box>
    <SellersTableView />
  </Box>
);

export default Sellers;
