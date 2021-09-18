import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const useMediaQueryStrings = () => {
  const theme = useTheme();
  const smallQuery = theme.breakpoints.down('sm');
  const notSmallQuery = theme.breakpoints.up('sm');
  const mediumQuery = theme.breakpoints.between('sm', 'md');
  const largeQuery = theme.breakpoints.up('md');
  const notLargeQuery = theme.breakpoints.down('md');
  return { smallQuery, notSmallQuery, mediumQuery, largeQuery, notLargeQuery };
};

export const useMediaQueries = () => {
  const theme = useTheme();
  const { smallQuery, mediumQuery, largeQuery } = useMediaQueryStrings(theme);
  const isSmall = useMediaQuery(smallQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);
  return { isSmall, isMedium, isLarge };
};
