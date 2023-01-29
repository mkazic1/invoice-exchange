import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import ROUTES from '../constants-data/routes';
import { pageLayoutStyle, linkStyle } from '../styles/CommonStyle';

const WelcomePage = () => (
  <Box sx={pageLayoutStyle}>
    <Typography variant="h3" component="h1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
      Invoice Exchange System
    </Typography>
    <Typography
      variant="h5"
      component="h4"
      sx={{ color: 'text.info', marginTop: 4, textAlign: 'center' }}
    >
      Invoice Exchange System deals with invoices, sellers, customers and makes your life easier
    </Typography>
    <Link to={`${ROUTES.DASHBOARD}`} style={linkStyle}>
      <Button variant="contained" sx={{ marginTop: 4 }}>
        Continue
      </Button>
    </Link>
  </Box>
);

export default WelcomePage;
