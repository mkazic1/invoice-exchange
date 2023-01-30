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
import { AssignmentInd } from '@mui/icons-material';
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

const AddSellerModal = ({ isDialogOpened, setIsDialogOpened }) => {
  const [isSaving, setIsSaving] = useState(false);

  const validationSchema = Yup.object().shape({
    companyName: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
    hqAddress: Yup.string()
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
    isActive: Yup.string()
      .test({
        test: (value) => {
          if (value === 'Active' || value === 'Inactive') {
            return true;
          }
          return false;
        },
        message: MESSAGES.ACTIVE_INACTIVE,
      })
      .required(MESSAGES.REQUIRED_FIELD)
      .typeError(MESSAGES.INVALID_INPUT),
  });

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onSubmit',
    defaultValues: {
      companyName: '',
      hqAddress: '',
      isActive: 'Active',
    },
  });

  const handleClose = () => {
    setIsDialogOpened(false);
    reset(
      {
        companyName: '',
        hqAddress: '',
        isActive: 'Active',
      },
    );
  };

  const formatStatus = (statusValue) => {
    if (statusValue === 'Active') {
      return true;
    }
    return false;
  };

  const onSubmitHandler = async (data) => {
    const newSeller = {
      companyName: data?.companyName,
      hqAddress: data?.hqAddress,
      isActive: formatStatus(data?.isActive),
    };
    try {
      setIsSaving(true);
      await fetch('/api/sellers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSeller),
      });

      toastifyAlertSuccess('New seller successfully added');
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
        <AssignmentInd sx={iconStyle} />
        <Typography variant="h5" component="span" sx={titleTypographyStyle}>
          Add new seller
        </Typography>
      </DialogTitle>
      <FormControl component="form">
        <DialogContent>
          <TextField
            focused
            label="Name"
            error={!!errors?.companyName}
            {...register('companyName')}
            helperText={errors?.companyName?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Headquarters address"
            error={!!errors?.hqAddress}
            {...register('hqAddress')}
            helperText={errors?.hqAddress?.message}
            sx={textfieldStyle}
          />
          <TextField
            focused
            label="Status"
            error={!!errors?.isActive}
            {...register('isActive')}
            helperText={errors?.isActive?.message}
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

AddSellerModal.defaultProps = {
  isDialogOpened: false,
  setIsDialogOpened: null,
};

AddSellerModal.propTypes = {
  isDialogOpened: PropTypes.bool,
  setIsDialogOpened: PropTypes.func,
};

export default AddSellerModal;
