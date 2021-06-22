import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
  palette: {
    primary: {
      main: '#20232a',
      highlightText: '#61dafb',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
});

export default theme;
