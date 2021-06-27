import { makeStyles } from '@material-ui/styles';
import useMedia from 'utils/media';
import { css } from '@emotion/css';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  // const largeQuery = useMedia(theme);
  const largeQuery = theme.breakpoints.up('lg');
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
    fixed: {
      display: 'none',
      [largeQuery]: {
        display: 'initial',
        position: 'fixed',
        /** [100% of initial containing block - margin * 2 - gap * 2 ] / 3 */
        width: `calc(${100 / 3}% - ${theme.spacing(8 / 3)})`,
      },
    },
    left: {
      display: 'inline-block',
      width: '0',
      backgroundColor: 'red',
      [largeQuery]: {
        /** [100% of root - gap * 2] / 3 */
        width: `calc(${100 / 3}% - ${theme.spacing(4 / 3)})`,
        marginRight: theme.spacing(2),
      },
    },
    right: {
      display: 'inline-block',
      width: '100%',
      '& $list': {
        marginTop: '0',
      },
      '& $card$major': {
        [largeQuery]: {
          display: 'initial',
          position: 'fixed',
          left: '0',
          top: '0',
          /** [100% of initial containing block - margin * 2 - gap * 2 ] / 3 */
          width: `calc(${100 / 3}% - ${theme.spacing(8 / 3)})`,
        },
      },
      [largeQuery]: {
        /** [100% of root - gap * 2] / 3 * 2 + gap */
        width: `calc(${(100 / 3) * 2}% - ${theme.spacing(2 / 3)})`,
        '& $item$major': {
          display: 'none',
        },
      },
    },
    /** root */
    root: {},
  };
});

export default useStyles;
