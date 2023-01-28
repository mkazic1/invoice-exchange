import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { AddBox, Delete, Edit } from '@mui/icons-material';
import CustomersTableView from './CustomersTableView';
import AddCustomerModal from './AddCustomerModal';
import DeleteModal from '../DeleteModal';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
  buttonsBoxStyle,
} from '../../styles/pages/PagesCommonStyle';

const Customers = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  return (
    <Box style={mainPagesLayoutStyle}>
      <Box sx={titleBoxStyle}>
        <Typography variant="h6" sx={mainPagesTitleStyle}>Customers</Typography>
        <Tooltip title="Add new customer">
          <Button
            startIcon={<AddBox />}
            size="medium"
            variant="contained"
            type="submit"
            onClick={() => setIsAddModalOpened(true)}
          >
            Add new customer
          </Button>
        </Tooltip>
        <AddCustomerModal
          isDialogOpened={isAddModalOpened}
          setIsDialogOpened={setIsAddModalOpened}
        />
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
            onClick={() => setIsDeleteModalOpened(true)}
          >
            Delete
          </Button>
        </Tooltip>
        <DeleteModal
          isDialogOpened={isDeleteModalOpened}
          setIsDialogOpened={setIsDeleteModalOpened}
        />
      </Box>
      <CustomersTableView />
    </Box>
  );
};

export default Customers;
