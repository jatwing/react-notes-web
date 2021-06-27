import { useMediaQuery } from '@material-ui/core';

const getMediaQueries = (theme) => {
  const smallQuery = theme.breakpoints.down('md');
  const mediumQuery = theme.breakpoints.between('md', 'lg');
  const largeQuery = theme.breakpoints.up('lg');
  return { smallQuery, mediumQuery, largeQuery };
};

const useMedia = (theme) => {
  const { smallQuery, mediumQuery, largeQuery } = getMediaQueries(theme);
  const isSmall = useMediaQuery(smallQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);
  return { isSmall, isMedium, isLarge };
};

export { getMediaQueries, useMedia }
