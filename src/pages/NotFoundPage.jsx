import { Link } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';
import ROUTES from '../constants/routes';
import { pageLayoutStyle, linkStyle } from '../styles/pages/CommonPagesStyle';

function NotFoundPage() {
  return (
    <Box sx={pageLayoutStyle}>
      <Typography variant="h1" component="h1" sx={{ color: 'text.info' }}>Oops!</Typography>
      <Typography variant="h4" component="h4" sx={{ color: 'text.primary' }}>404 - This page could not be found!</Typography>
      <Link to={`${ROUTES.WELCOME}`} style={linkStyle}>
        <Button variant="contained" sx={{ marginTop: 4 }}>
          GO BACK
        </Button>
      </Link>
    </Box>
  );
}

export default NotFoundPage;
