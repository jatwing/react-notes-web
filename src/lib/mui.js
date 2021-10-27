import { useMediaQuery } from '@mui/material';
import { createTheme, useTheme } from '@mui/material/styles';

/** theme */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      /** (76, 4a, bc) + (86, d4, 6b) - (76, 4a, bc) */
      main: '#9b442c'
    },
    react: {
      main: '#61dafb'
    },
    redux: {
      main: '#764abc'
    },
    saga: {
      main: '#86d46b'
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
