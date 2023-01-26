import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import {
  titleBoxStyle,
  buttonsStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
} from '../../styles/pages/PagesCommonStyle';
import CreateInvoiceModal from './CreateInvoiceModal';

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
            sx={buttonsStyle}
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
    </Box>
  );
};

export default Invoices;
