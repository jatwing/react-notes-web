import { useMediaQuery } from '@mui/material';
import { createTheme, useTheme } from '@mui/material/styles';

/** theme */
export const theme = createTheme({
  palette: {
    mode: 'light',
    react: {
      main: '#61dafb', /** rgb(97, 218, 251) */
      light: '#9affff',
      dark: '#10a8c8',
    },
    redux: {
      main: '#764abc', /** rgb(118, 74, 188) */
      light: '#a877ef',
      dark: '#441e8b',
    },
    saga: {
      main: '#89d96d', /** rgb(134, 212, 107) */  /** TODO use wrong value to fix */
      light: '#b9ff9b',
      dark: '#54a23d',
    },
    primary: {
      /** (97, 218, 251) - (134, 212, 107) = (118, 74, 188) - (155, 68, 44) */
      main: '#9b442c', /** rgb(155, 68, 44) */
      light: '#d07156',
      dark: '#671702',
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
