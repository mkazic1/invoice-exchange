import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material';
import theme from '../styles/theme';

function Providers({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
