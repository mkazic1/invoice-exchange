import { createTheme, responsiveFontSizes } from '@mui/material';

const PRIMARY = {
  main: '#052258',
};

const SECONDARY = {
  light: '#FFFFFF',
  main: '#F2F2F2',
  dark: '#B2B2B2',
  darker: '#000000',
};

const INFO = {
  lighter: '#963a8c',
  main: '#551c57',
};

const SUCCESS = {
  main: '#2AB04E',
};

const ERROR = {
  main: '#D91111',
};

const theme = createTheme({
  palette: {
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    error: ERROR,
    text: {
      primary: PRIMARY.main,
      secondary: SECONDARY.main,
      info: INFO.main,
      pending: INFO.lighter,
    },
  },

  typography: {
    fontSize: 16,
    fontFamily: ['Lato', 'sans-serif'].join(','),
  },

  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            textTransform: 'none',
            textAlign: 'center',
            border: `solid 1px ${PRIMARY.main}`,
            color: PRIMARY.main,
            backgroundColor: SECONDARY.main,
            borderRadius: '4px',
            '&:hover': {
              border: `solid 1px ${PRIMARY.main}`,
              backgroundColor: SECONDARY.main,
              boxShadow: `0px 2px 15px -1px ${PRIMARY.main}`,
            },
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            textTransform: 'none',
            textAlign: 'center',
            border: `solid 1px ${PRIMARY.main}`,
            color: SECONDARY.main,
            backgroundColor: PRIMARY.main,
            borderRadius: '4px',
            '&:hover': {
              border: `solid 1px ${PRIMARY.main}`,
              backgroundColor: PRIMARY.main,
              boxShadow: `0px 2px 15px -1px ${PRIMARY.main}`,
            },
          },
        },
      ],
    },
  },
});

const responsiveFontTheme = responsiveFontSizes(theme);
export default responsiveFontTheme;
