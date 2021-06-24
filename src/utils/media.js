import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';

const useMedia = () => {
  const theme = useTheme();
  const smallQuery = theme.breakpoints.down('md');
  const mediumQuery = theme.breakpoints.between('md', 'lg');
  const largeQuery = theme.breakpoints.up('lg');
  const isSmall = useMediaQuery(smallQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);
  return { smallQuery, mediumQuery, largeQuery, isSmall, isMedium, isLarge };
};

export default useMedia;
