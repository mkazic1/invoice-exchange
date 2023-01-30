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
import AddCustomerModal from './AddCustomerModal';
import DeleteModal from './DeleteModal';
import { toastifyAlertError } from '../../constants-data/toastify';
import TABLE_HEADER from '../../constants-data/customers-table';
import { headerCellStyle, rowCellStyle, tableBox } from '../../styles/pages/TableStyle';
import { buttonsBoxStyle, circularLoaderStyle } from '../../styles/pages/PagesCommonStyle';

const CustomersTableView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = React.useState([]);
  const [customers, setCustomers] = useState([]);
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

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data.customers);
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
        <Tooltip title="Add new customer">
          <Button
            startIcon={<AddBox />}
            size="medium"
            variant="contained"
            type="submit"
            sx={{ marginRight: '10px' }}
            onClick={() => setIsAddModalOpened(true)}
          >
            Add new customer
          </Button>
        </Tooltip>
        <AddCustomerModal
          isDialogOpened={isAddModalOpened}
          setIsDialogOpened={setIsAddModalOpened}
        />
        <Tooltip title="Edit customer">
          <span>
            <Button
              startIcon={<Edit />}
              size="medium"
              variant="contained"
              disabled
              sx={{ marginRight: '10px' }}
            >
              Edit
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="Delete customer">
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
          customerIds={selected}
          setCustomerIds={setSelected}
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
                  {customers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((customer) => {
                    const isItemSelected = isSelected(customer.id);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={customer?.id}
                        sx={{ cursor: 'pointer' }}
                        onClick={(event) => handleClick(event, customer.id)}
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        {TABLE_HEADER?.map((headerItem) => (
                          <TableCell key={headerItem?.key} sx={rowCellStyle}>
                            {customer[headerItem?.key]}
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
              count={customers?.length}
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

export default CustomersTableView;
