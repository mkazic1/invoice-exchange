import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  CircularProgress,
  Tooltip,
  Button,
} from '@mui/material';
import { AddBox, Delete, Edit } from '@mui/icons-material';
import TABLE_HEADER from '../../constants-data/invoice-table';
import { toastifyAlertError } from '../../constants-data/toastify';
import DeleteModal from './DeleteModal';
import CreateInvoiceModal from './CreateInvoiceModal';
import { headerCellStyle, rowCellStyle, tableBox } from '../../styles/pages/TableStyle';
import { circularLoaderStyle, buttonsBoxStyle } from '../../styles/pages/PagesCommonStyle';

const InvoicesTableView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = React.useState([]);
  const [invoices, setInvoices] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
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
      const response = await fetch('/api/invoices');
      const data = await response.json();
      setInvoices(data.invoices);
    } catch (error) {
      toastifyAlertError('Something went wrong');
    }
    setIsDataLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [isCreateModalOpened, isDeleteModalOpened]);

  return (
    <>
      <Box sx={buttonsBoxStyle}>
        <Tooltip title="Create new invoice">
          <Button
            startIcon={<AddBox />}
            size="medium"
            variant="contained"
            sx={{ marginRight: '10px' }}
            onClick={() => setIsCreateModalOpened(true)}
          >
            Create invoice
          </Button>
        </Tooltip>
        <CreateInvoiceModal
          isDialogOpened={isCreateModalOpened}
          setIsDialogOpened={setIsCreateModalOpened}
        />
        <Tooltip title="Edit invoice">
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
        <Tooltip title="Delete invoice">
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
          invoiceIds={selected}
          setInvoiceIds={setSelected}
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
                  {invoices?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((invoice) => {
                    const isItemSelected = isSelected(invoice.id);

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={invoice?.id}
                        sx={{ cursor: 'pointer' }}
                        onClick={(event) => handleClick(event, invoice.id)}
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        {TABLE_HEADER?.map((headerItem) => (
                          <TableCell key={headerItem?.key} sx={rowCellStyle}>
                            {invoice[headerItem?.key]}
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
              count={invoices?.length}
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

export default InvoicesTableView;
