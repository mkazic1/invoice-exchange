import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import ROUTES from '../constants-data/routes';
import LogoPath from '../assets/logo2.png';
import {
  appBarStyle,
  containerStyle,
  cardMediaStyle,
  navigationTitleStyle,
} from '../styles/components/NavigationBarStyle';
import { linkStyle } from '../styles/CommonStyle';

const NavigationBar = () => (
  <AppBar position="fixed" sx={appBarStyle}>
    <Container maxWidth="false" style={containerStyle}>
      <Box>
        <Link to={ROUTES.DASHBOARD} style={linkStyle}>
          <Toolbar variant="dense">
            <CardMedia
              image={LogoPath}
              alt="LogoImage"
              component="img"
              sx={cardMediaStyle}
            />
            <Typography
              variant="h6"
              component="h6"
              sx={navigationTitleStyle}
            >
              Invoice Exchange
            </Typography>
          </Toolbar>
        </Link>
      </Box>
    </Container>
  </AppBar>
);

export default NavigationBar;
