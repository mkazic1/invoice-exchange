import React, { useState } from 'react';
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
} from '@mui/material';
import { Description } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers';
import MESSAGES from '../../constants-data/validation';
import { toastifyAlertSuccess, toastifyAlertError } from '../../constants-data/toastify';
import {
  dialogActionStyle,
  iconStyle,
  titleTypographyStyle,
  dialogTitleBox,
  textfieldStyle,
} from '../../styles/pages/CreateModalStyle';

const CreateInvoiceModal = ({ isDialogOpened, setIsDialogOpened }) => {
  const [isSaving, setIsSaving] = useState(false);

  const validationSchema = Yup.object().shape({
    seller: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
    customer: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
    date: Yup.string(),
    amount: Yup.number()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
  });

  const {
    register, handleSubmit, reset, setValue, trigger, watch, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
    },
  });

  const handleClose = () => {
    setIsDialogOpened(false);
    reset(
      {
        seller: '',
        customer: '',
        amount: '',
      },
    );
  };

  const onSubmitHandler = async () => {
    try {
      setIsSaving(true);
      toastifyAlertSuccess('New invoice successfully created');
      handleClose();
    } catch (error) {
      toastifyAlertError('Something went wrong');
    }
    setIsSaving(false);
  };

  const invoiceDate = watch('date');

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
      <FormControl component="form">
        <DialogContent>
          <TextField
            focused
            label="Seller"
            error={!!errors?.seller}
            register={register}
            fieldName="seller"
            helperText={errors?.seller?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Customer"
            error={!!errors?.customer}
            register={register}
            fieldName="customer"
            helperText={errors?.customer?.message}
            sx={textfieldStyle}
          />
          <DatePicker
            label="Date"
            disableFuture
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
            error={!!errors?.amount}
            register={register}
            fieldName="amount"
            helperText={errors?.amount?.message}
            sx={textfieldStyle}
          />
        </DialogContent>
      </FormControl>
      <DialogActions sx={dialogActionStyle}>
        <Button
          variant="outlined"
          onClick={handleClose}
        >
          Discard
        </Button>
        <LoadingButton
          loading={isSaving}
          variant="contained"
          disableElevation
          onClick={handleSubmit(onSubmitHandler)}
          disabled={isSaving}
        >
          Create invoice
        </LoadingButton>
      </DialogActions>
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
