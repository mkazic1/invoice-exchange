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
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
  });

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const handleClose = () => {
    setIsDialogOpened(false);
    reset(
      {
        name: '',
        surname: '',
        address: '',
        age: 0,
      },
    );
  };

  const onSubmitHandler = async () => {
    try {
      setIsSaving(true);
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
            error={!!errors?.name}
            register={register}
            fieldName="name"
            helperText={errors?.name?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Surname"
            error={!!errors?.surname}
            register={register}
            fieldName="surname"
            helperText={errors?.surname?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Address"
            error={!!errors?.address}
            register={register}
            fieldName="address"
            helperText={errors?.address?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Age"
            error={!!errors?.age}
            register={register}
            fieldName="age"
            helperText={errors?.age?.message}
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
          Save
        </LoadingButton>
      </DialogActions>
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
