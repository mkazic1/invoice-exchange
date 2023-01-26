import { toast } from 'react-toastify';

const TOASTIFY_SETTINGS = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  progress: undefined,
};

export const toastifyAlertSuccess = (message) => {
  toast.success(message, TOASTIFY_SETTINGS);
};

export const toastifyAlertError = (message) => {
  toast.error(message, TOASTIFY_SETTINGS);
};

export const toastifyAlertInfo = (message) => {
  toast.info(message, TOASTIFY_SETTINGS);
};
