import { makeStyles } from '@material-ui/styles';
import { getMediaQueries } from 'utils/media';

/**
 * here we get some element names from the outer special classes
 * TODO dangerous!
 * the potential re-rendering may occur, can we rewrite it?
 *
 *
 * another problem is that, it try to define some styles for some potential
 * outer classes, is that OK?
 */

const useStyles = (classes) =>
  makeStyles((theme) => {
    const { mediumQuery, largeQuery } = getMediaQueries(theme);
    return {
      /** block */
      title: {
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        ...(classes.text && {
          ['& .' + classes.text]: {
            ...theme.typography.h6,
            fontFamily: theme.typography.fontStacks.sansSerif,
          },
        }),
      },

      content: {
        backgroundColor: '#ffffff',
        '$container $title + &': {
          padding: '16px 24px 16px 24px',
        },
        ...(classes.link && {
          ['& .' + classes.link]: {
            textDecoration: 'none',
            color: theme.palette.secondary.dark,
            '&:hover, &:focus': {
              textDecoration: 'underline',
            },
            '&:active': {
              textDecoration: 'none',
              color: '#ffffff',
              backgroundColor: theme.palette.secondary.dark,
            },
          },
        }),
      },

      actions: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '75%',
        padding: '16px 24px 16px 24px',
        margin: '0 auto 0 auto',
        ...(classes.button && {
          ['& .' + classes.button]: {
            fontFamily: theme.typography.fontStacks.sansSerif,
            textTransform: 'none',
            color: theme.palette.secondary.dark,
            backgroundColor: '#ffffff',
            border: `2px solid ${theme.palette.secondary.dark}`,
            borderRadius: '8px',
            '&:hover, &:focus': {
              color: '#ffffff',
              backgroundColor: theme.palette.secondary.dark,
            },
          },
        }),
        [mediumQuery]: {
          width: '50%',
        },
        [largeQuery]: {
          width: '37.5%',
        },
      },

      /** container */
      container: {},
    };
  });

export default useStyles;
