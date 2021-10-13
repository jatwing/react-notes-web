import { useMediaQuery } from '@mui/material';
import { createTheme, useTheme } from '@mui/material/styles';

/** theme */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: /** 露草色 */ '#3d87c3',
    },
    secondary: {
      main: /** 木賊色 */ '#40684f',
    },
    error: {
      main: /** 茜色 */ '#b13546',
    },
    warning: {
      main: /** 躑躅色 */ '#dc4473',
    },
    info: {
      main: /** 向日葵色 */ '#ffba20',
    },
    success: {
      main: /** 菫色 */ '#654e99',
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
