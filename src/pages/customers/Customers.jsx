import React from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { AddBox, Delete, Edit } from '@mui/icons-material';
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
      <Tooltip title="Create new invoice">
        <Button
          startIcon={<AddBox />}
          size="medium"
          variant="contained"
          type="submit"
        >
          Create invoice
        </Button>
      </Tooltip>
    </Box>
    <Box sx={buttonsBoxStyle}>
      <Tooltip title="Edit inactive invoice">
        <Button
          startIcon={<Edit />}
          size="medium"
          variant="contained"
          sx={{ marginRight: '10px' }}
        >
          Edit
        </Button>
      </Tooltip>
      <Tooltip title="Delete invoice">
        <Button
          startIcon={<Delete />}
          size="medium"
          variant="contained"
        >
          Delete
        </Button>
      </Tooltip>
    </Box>
  </Box>
);

export default Customers;
