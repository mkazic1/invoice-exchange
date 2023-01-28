import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Tooltip,
} from '@mui/material';
import { AddBox, Delete, Edit } from '@mui/icons-material';
import SellersTableView from './SellersTableVies';
import AddSellerModal from './AddSellerModal';
import DeleteModal from '../DeleteModal';
import {
  titleBoxStyle,
  mainPagesLayoutStyle,
  mainPagesTitleStyle,
  buttonsBoxStyle,
} from '../../styles/pages/PagesCommonStyle';

const Sellers = () => {
  const [isAddSellerModalOpened, setIsAddSellerModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  return (
    <Box style={mainPagesLayoutStyle}>
      <Box sx={titleBoxStyle}>
        <Typography variant="h6" sx={mainPagesTitleStyle}>Sellers</Typography>
        <Tooltip title="Add new seller">
          <Button
            startIcon={<AddBox />}
            size="medium"
            variant="contained"
            type="submit"
            onClick={() => setIsAddSellerModalOpened(true)}
          >
            Add new seller
          </Button>
        </Tooltip>
        <AddSellerModal
          isDialogOpened={isAddSellerModalOpened}
          setIsDialogOpened={setIsAddSellerModalOpened}
        />
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
      <SellersTableView />
    </Box>
  );
};

export default Sellers;
