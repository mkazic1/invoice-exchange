import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import CreateInvoiceModal from './CreateInvoiceModal';
import InvoicesTableView from './InvoicesTableView';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
} from '../../styles/pages/PagesCommonStyle';

const Invoices = () => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);

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
      <InvoicesTableView />
    </Box>
  );
};

export default Invoices;
