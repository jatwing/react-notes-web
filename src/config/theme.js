import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
    //  main: '#2a9c7a',
     // contrastText: '#000000',

      main: '#20232a',
      contrastText: '#ffffff',
      highlightText: '#61dafb',
    },
  },
    secondary: {
    //  main: '#9cc8e2'
      main: '#3f51b5',
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
});

export default theme;
