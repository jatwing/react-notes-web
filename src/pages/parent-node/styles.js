import { makeStyles } from '@material-ui/styles';
import { getMediaQueries } from 'utils/media';

const useStyles = makeStyles((theme) => {
  const { largeQuery } = getMediaQueries(theme);
  return {
    /** modifier */
    major: {},
    /** element */
    list: {
      overflow: 'visible',
    },
    card: {
      width: '100%',
    },
    /** block */
    left: {
      display: 'inline-block',
      width: '0',
      [largeQuery]: {
        /** ('root' width - gap * 2) / 3 + gap * 2 */
        width: `calc(${100 / 3}% + ${theme.spacing(2 / 3)})`,
      },
    },
    right: {
      display: 'inline-block',
      width: '100%',
      '& $list': {
        marginTop: '0',
      },
      [largeQuery]: {
        /** ('root' width - gap * 2) / 3 * 2 + gap * 2 */
        width: `calc(${(100 / 3) * 2}% - ${theme.spacing(2 / 3)})`,
        '& $card$major': {
          /** default position relative to 'right' */
          position: 'fixed',
          left: theme.spacing(2),
          /** (<html> width - margin * 2 - gap * 2) / 3 */
          width: `calc(${100 / 3}% - ${theme.spacing(8 / 3)})`,
        },
      },
    },
    /** root */
    root: {},
  };
});

export default useStyles;
