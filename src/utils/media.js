/**
 * @see https://getbootstrap.com/docs/5.0/layout/breakpoints/#media-queries
 */

import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const useMedia = () => {
  const theme = useTheme();
  const smallQuery = theme.breakpoints.down('sm')
  const mediumQuery = theme.breakpoints.only('md')
  const largeQuery = theme.breakpoints.up('lg')
  const isSmall = useMediaQuery(smallQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);
  return { smallQuery, mediumQuery, largeQuery, isSmall, isMedium, isLarge  };
};

export default useMedia;
