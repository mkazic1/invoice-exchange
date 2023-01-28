import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { AddBox, Delete, Edit } from '@mui/icons-material';
import CreateInvoiceModal from './CreateInvoiceModal';
import InvoicesTableView from './InvoicesTableView';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
  buttonsBoxStyle,
} from '../../styles/pages/PagesCommonStyle';
import DeleteModal from '../DeleteModal';

const Invoices = () => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  return (
    <Box style={mainPagesLayoutStyle}>
      <Box sx={titleBoxStyle}>
        <Typography variant="h6" sx={mainPagesTitleStyle}>Invoices</Typography>
        <Tooltip title="Create new invoice">
          <Button
            startIcon={<AddBox />}
            size="medium"
            variant="contained"
            type="submit"
            onClick={() => setIsCreateModalOpened(true)}
          >
            Create invoice
          </Button>
        </Tooltip>
        <CreateInvoiceModal
          isDialogOpened={isCreateModalOpened}
          setIsDialogOpened={setIsCreateModalOpened}
        />
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
      <InvoicesTableView />
    </Box>
  );
};

export default Invoices;
