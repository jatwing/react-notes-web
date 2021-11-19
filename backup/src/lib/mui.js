import { useMediaQuery } from '@mui/material';
import { createTheme, useTheme } from '@mui/material/styles';

/** theme */
export const theme = createTheme({
  palette: {
    mode: 'light',
    react: {
      main: '#61dafb' /** rgb(97, 218, 251) */,
      light: '#9affff',
      dark: '#10a8c8',
    },
    redux: {
      main: '#764abc' /** rgb(118, 74, 188) */,
      light: '#a877ef',
      dark: '#441e8b',
    },
    saga: {
      main: '#89d96d' /** rgb(137, 217, 109) */,
      light: '#bcff9d',
      dark: '#57a73f',
    },
    primary: {
      /** (97, 218, 251) - (137, 217, 109) = (118, 74, 188) - (158, 73, 46) */
      main: '#9e492e' /** rgb(158, 73, 46) */,
      light: '#d37658',
      dark: '#6a1d05',
    },
  },
  typography: {
    fontFamilies: {
      serif: '"Roboto Slab", "serif"',
      sansSerif: '"Roboto", "Helvetica", "Arial", sans-serif',
      monospace: '"Roboto Mono", monospace',
    },
  },
});

/** media query */
export const useMediaQueryStrings = () => {
  const theme = useTheme();
  const smallQuery = theme.breakpoints.down('sm');
  const mediumQuery = theme.breakpoints.between('sm', 'md');
  const largeQuery = theme.breakpoints.up('md');
  return { smallQuery, mediumQuery, largeQuery };
};

export const useMediaQueries = () => {
  const { smallQuery, mediumQuery, largeQuery } = useMediaQueryStrings();
  const isSmall = useMediaQuery(smallQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);
  return { isSmall, isMedium, isLarge };
};
