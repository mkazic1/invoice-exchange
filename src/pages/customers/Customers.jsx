import React from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { AddBox, Delete, Edit } from '@mui/icons-material';
import CustomersTableView from './CustomersTableView';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
  buttonsBoxStyle,
} from '../../styles/pages/PagesCommonStyle';

const Customers = () => (
  <Box style={mainPagesLayoutStyle}>
    <Box sx={titleBoxStyle}>
      <Typography variant="h6" sx={mainPagesTitleStyle}>Customers</Typography>
      <Tooltip title="Add new customer">
        <Button
          startIcon={<AddBox />}
          size="medium"
          variant="contained"
          type="submit"
        >
          Add new customer
        </Button>
      </Tooltip>
    </Box>
    <Box sx={buttonsBoxStyle}>
      <Tooltip title="Edit customer">
        <Button
          startIcon={<Edit />}
          size="medium"
          variant="contained"
          sx={{ marginRight: '10px' }}
        >
          Edit
        </Button>
      </Tooltip>
      <Tooltip title="Delete customer">
        <Button
          startIcon={<Delete />}
          size="medium"
          variant="contained"
        >
          Delete
        </Button>
      </Tooltip>
    </Box>
    <CustomersTableView />
  </Box>
);

export default Customers;
