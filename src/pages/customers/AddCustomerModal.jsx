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
import { Groups } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import MESSAGES from '../../constants-data/validation';
import { toastifyAlertSuccess, toastifyAlertError } from '../../constants-data/toastify';
import {
  dialogActionStyle,
  iconStyle,
  titleTypographyStyle,
  dialogTitleBox,
  textfieldStyle,
} from '../../styles/pages/CreateModalStyle';

const AddCustomerModal = ({ isDialogOpened, setIsDialogOpened }) => {
  const [isSaving, setIsSaving] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
    surname: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
    address: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
    age: Yup.number()
      .moreThan(17, MESSAGES.INVALID_AGE)
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
  });

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      surname: '',
      address: '',
      age: 18,
    },
  });

  const handleClose = () => {
    setIsDialogOpened(false);
    reset(
      {
        name: '',
        surname: '',
        address: '',
        age: 18,
      },
    );
  };

  const onSubmitHandler = async (data) => {
    const newCustomer = {
      name: data?.name,
      surname: data?.surname,
      address: data?.address,
      age: data?.age,
    };
    try {
      setIsSaving(true);
      await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCustomer),
      });

      toastifyAlertSuccess('New customer successfully added');
      handleClose();
    } catch (error) {
      toastifyAlertError('Something went wrong');
    }
    setIsSaving(false);
  };

  return (
    <Dialog
      open={isDialogOpened}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={dialogTitleBox}>
        <Groups sx={iconStyle} />
        <Typography variant="h5" component="span" sx={titleTypographyStyle}>
          Add new customer
        </Typography>
      </DialogTitle>
      <FormControl component="form">
        <DialogContent>
          <TextField
            focused
            label="Name"
            {...register('name')}
            error={!!errors?.name}
            helperText={errors?.name?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Surname"
            {...register('surname')}
            error={!!errors?.surname}
            helperText={errors?.surname?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Address"
            {...register('address')}
            error={!!errors?.address}
            helperText={errors?.address?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Age"
            type="number"
            {...register('age')}
            error={!!errors?.age}
            helperText={errors?.age?.message}
            sx={textfieldStyle}
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
            loading={isSaving}
            variant="contained"
            disableElevation
            onClick={handleSubmit(onSubmitHandler)}
            disabled={isSaving}
          >
            Save
          </LoadingButton>
        </DialogActions>
      </FormControl>
    </Dialog>
  );
};

AddCustomerModal.defaultProps = {
  isDialogOpened: false,
  setIsDialogOpened: null,
};

AddCustomerModal.propTypes = {
  isDialogOpened: PropTypes.bool,
  setIsDialogOpened: PropTypes.func,
};

export default AddCustomerModal;
