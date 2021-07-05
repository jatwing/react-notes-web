import { makeStyles } from '@material-ui/styles';
import { getMediaQueries } from 'utils/media';

const useStyles = makeStyles((theme) => {
  const { largeQuery } = getMediaQueries(theme);
  return {
    /** modifier */
    major: {},
    /** element */
    card: {
      width: '100%',
    },
    /** block */
    list: {
      margin: '0 0 -16px  0',
      overflow: 'visible',
    },
    /** container */
    container: {},
  };
});

export default useStyles;
