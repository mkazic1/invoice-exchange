import {
  AppBar,
  Toolbar,
  Container,
  CardMedia,
  Typography,
  Box,
} from '@mui/material';
import LogoPath from '../assets/logo2.png';
import {
  appBarStyle,
  containerStyle,
  cardMediaStyle,
  navigationTitleStyle,
} from '../styles/components/NavigationBarStyle';

const NavigationBar = () => (
  <AppBar position="fixed" sx={appBarStyle}>
    <Container maxWidth="false" style={containerStyle}>
      <Box>
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
      </Box>
    </Container>
  </AppBar>
);

export default NavigationBar;
