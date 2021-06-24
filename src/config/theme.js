import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#20232a',
      contrastText: '#ffffff',
      highlightText: '#61dafb',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
  typography: {
    fontFamily: 'Roboto Slab, serif',
    fontStacks: {
      serif: 'Roboto Slab, serif',
      sansSerif: 'Roboto, sans-serif',
      monospace: 'Roboto Mono, monospace',
      cursive: 'cursive',
      fantasy: 'fantasy',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});

export default theme;
