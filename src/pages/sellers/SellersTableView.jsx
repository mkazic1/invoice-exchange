import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import { AddBox, Delete, Edit } from '@mui/icons-material';
import AddSellerModal from './AddSellerModal';
import DeleteModal from './DeleteModal';
import { toastifyAlertError } from '../../constants-data/toastify';
import TABLE_HEADER from '../../constants-data/sellers-table';
import { headerCellStyle, rowCellStyle, tableBox } from '../../styles/pages/TableStyle';
import { buttonsBoxStyle, circularLoaderStyle } from '../../styles/pages/PagesCommonStyle';

const SellersTableView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = React.useState([]);
  const [sellers, setSellers] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isAddModalOpened, setIsAddModalOpened] = useState(false);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const formatStatus = (statusValue) => {
    if (statusValue === false) {
      return 'Inactive';
    }
    return 'Active';
  };

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const response = await fetch('/api/sellers');
      const data = await response.json();
      const updatedStatusData = data?.sellers.map((seller) => ({
        ...seller,
        isActive: formatStatus(seller?.isActive),
      }));
      setSellers(updatedStatusData);
    } catch (error) {
      toastifyAlertError('Something went wrong');
    }
    setIsDataLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isAddModalOpened, isDeleteModalOpened]);

  return (
    <>
      <Box sx={buttonsBoxStyle}>
        <Tooltip title="Add new seller">
          <Button
            startIcon={<AddBox />}
            size="medium"
            variant="contained"
            type="submit"
            sx={{ marginRight: '10px' }}
            onClick={() => setIsAddModalOpened(true)}
          >
            Add new seller
          </Button>
        </Tooltip>
        <AddSellerModal
          isDialogOpened={isAddModalOpened}
          setIsDialogOpened={setIsAddModalOpened}
        />
        <Tooltip title="Edit seller">
          <span>
            <Button
              startIcon={<Edit />}
              size="medium"
              variant="contained"
              disabled={selected.length === 0 || selected.length > 1}
              sx={{ marginRight: '10px' }}
            >
              Edit
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="Delete seller">
          <span>
            <Button
              startIcon={<Delete />}
              size="medium"
              variant="contained"
              disabled={selected.length === 0}
              onClick={() => setIsDeleteModalOpened(true)}
            >
              Delete
            </Button>
          </span>
        </Tooltip>
        <DeleteModal
          isDialogOpened={isDeleteModalOpened}
          setIsDialogOpened={setIsDeleteModalOpened}
          sellerIds={selected}
          setSellerIds={setSelected}
        />
      </Box>
      <Box sx={tableBox}>
        {isDataLoading ? (
          <Box sx={circularLoaderStyle}>
            <CircularProgress sx={{ color: 'info.main' }} />
          </Box>
        ) : (
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {TABLE_HEADER?.map((item) => (
                      <TableCell key={item?.key} sx={headerCellStyle}>
                        {item?.title}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sellers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((seller) => {
                    const isItemSelected = isSelected(seller.id);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={seller?.id}
                        sx={{ cursor: 'pointer' }}
                        onClick={(event) => handleClick(event, seller.id)}
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        {TABLE_HEADER?.map((headerItem) => (
                          <TableCell key={headerItem?.key} sx={rowCellStyle}>
                            {seller[headerItem?.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={sellers?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </Box>
    </>
  );
};

export default SellersTableView;
