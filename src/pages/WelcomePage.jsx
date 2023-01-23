import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import ROUTES from '../constants/routes';
import { pageLayoutStyle, linkStyle } from '../styles/pages/CommonPagesStyle';

function WelcomePage() {
  return (
    <Box sx={pageLayoutStyle}>
      <Typography variant="h3" component="h1" sx={{ color: 'text.primary' }}>
        Invoice Exchange System
      </Typography>
      <Typography variant="h5" component="h4" sx={{ color: 'text.info', marginTop: 4 }}>
        Invoice Exchange System deals with invoices, sellers, and customers and makes life easier
      </Typography>
      <Link to={`${ROUTES.DASHBOARD}`} style={linkStyle}>
        <Button variant="contained" sx={{ marginTop: 4 }}>
          Continue
        </Button>
      </Link>
    </Box>
  );
}

export default WelcomePage;
