import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  InputLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Description } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import MESSAGES from '../../constants-data/validation';
import { toastifyAlertSuccess, toastifyAlertError } from '../../constants-data/toastify';
import {
  dialogActionStyle,
  iconStyle,
  titleTypographyStyle,
  dialogTitleBox,
  textfieldStyle,
} from '../../styles/pages/CreateModalStyle';
import { circularLoaderStyle } from '../../styles/pages/PagesCommonStyle';

const CreateInvoiceModal = ({ isDialogOpened, setIsDialogOpened }) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const validationSchema = Yup.object().shape({
    sellerName: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD),
    customerName: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD),
    date: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
    amount: Yup.number()
      .moreThan(0, MESSAGES.INVALID_AMOUNT)
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
  });

  const {
    register, handleSubmit, reset, setValue, trigger, watch, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues: {
      sellerName: '',
      customerName: '',
      date: new Date().toLocaleDateString(),
      amount: 0,
    },
  });

  const invoiceDate = watch('date');
  const sellerName = watch('sellerName');
  const customerName = watch('customerName');

  const handleClose = () => {
    setIsDialogOpened(false);
    reset(
      {
        sellerName: '',
        customerName: '',
        date: new Date(),
        amount: 0,
      },
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  };

  const onSubmitHandler = async (data) => {
    const newInvoice = {
      sellerName: data?.sellerName,
      customerName: data?.customerName,
      date: formatDate(data?.date),
      amount: data?.amount,
    };
    try {
      setIsSaving(true);
      await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInvoice),
      });

      toastifyAlertSuccess('New invoice successfully created');
      handleClose();
    } catch (error) {
      toastifyAlertError('Something went wrong');
    }
    setIsSaving(false);
  };

  const fetchData = async () => {
    setIsDataLoading(true);
    try {
      const responseSellers = await fetch('/api/sellers');
      const dataSellers = await responseSellers.json();

      const responseCustomers = await fetch('/api/customers');
      const dataCustomers = await responseCustomers.json();

      setSellers(dataSellers.sellers);
      setCustomers(dataCustomers.customers);
    } catch (error) {
      toastifyAlertError('Something went wrong');
    }
    setIsDataLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Dialog
      open={isDialogOpened}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={dialogTitleBox}>
        <Description sx={iconStyle} />
        <Typography variant="h5" component="span" sx={titleTypographyStyle}>
          Create invoice
        </Typography>
      </DialogTitle>
      {isDataLoading ? (
        <Box sx={circularLoaderStyle}>
          <CircularProgress sx={{ color: 'info.main' }} />
        </Box>
      ) : (
        <FormControl component="form">
          <DialogContent>
            <FormControl
              focused
              fullWidth
              sx={textfieldStyle}
            >
              <InputLabel>Seller</InputLabel>
              <Select
                label="Seller"
                onChange={(event) => setValue('sellerName', event.target.value)}
                value={sellerName}
              >
                {sellers?.map((seller) => (
                  <MenuItem key={seller?.id} value={seller?.companyName}>
                    {seller?.companyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              focused
              fullWidth
              sx={textfieldStyle}
            >
              <InputLabel>Customer</InputLabel>
              <Select
                label="Customer"
                onChange={(event) => setValue('customerName', event.target.value)}
                value={customerName}
              >
                {customers?.map((customer) => (
                  <MenuItem key={customer?.id} value={`${customer?.name} ${customer?.surname}`}>
                    {`${customer?.name} ${customer?.surname}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DesktopDatePicker
              label="Date"
              disableFuture
              inputFormat="DD/MM/YYYY"
              onChange={async (value) => {
                setValue('date', value);
                await trigger('date');
              }}
              value={invoiceDate}
              renderInput={(params) => (
                <TextField
                  focused
                  {...params}
                  sx={textfieldStyle}
                />
              )}
            />
            <TextField
              focused
              label="Amount"
              type="number"
              {...register('amount')}
              error={!!errors?.amount}
              helperText={errors?.amount?.message}
              sx={textfieldStyle}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </DialogContent>
          <DialogActions sx={dialogActionStyle}>
            <Button
              variant="outlined"
              onClick={handleClose}
            >
              Discard
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSaving}
              disableElevation
              onClick={handleSubmit(onSubmitHandler)}
              disabled={isSaving}
            >
              Save
            </LoadingButton>
          </DialogActions>
        </FormControl>
      )}
    </Dialog>
  );
};

CreateInvoiceModal.defaultProps = {
  isDialogOpened: false,
  setIsDialogOpened: null,
};

CreateInvoiceModal.propTypes = {
  isDialogOpened: PropTypes.bool,
  setIsDialogOpened: PropTypes.func,
};

export default CreateInvoiceModal;
