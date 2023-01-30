import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ToastProvider from './ToastifyProvider';
import theme from '../styles/theme';

const Providers = ({ children }) => (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ToastProvider>
        {children}
      </ToastProvider>
    </LocalizationProvider>
  </ThemeProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
