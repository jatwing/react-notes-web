import { useMediaQuery } from '@material-ui/core';

export const getMediaQueries = (theme) => {
  const smallQuery = theme.breakpoints.down('md');
  const mediumQuery = theme.breakpoints.between('md', 'lg');
  const largeQuery = theme.breakpoints.up('lg');
  const mediumLargeQuery = theme.breakpoints.up('md');
  return { smallQuery, mediumQuery, largeQuery, mediumLargeQuery };
};

export const useMedia = (theme) => {
  const { smallQuery, mediumQuery, largeQuery } = getMediaQueries(theme);
  const isSmall = useMediaQuery(smallQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);
  return { isSmall, isMedium, isLarge };
};
