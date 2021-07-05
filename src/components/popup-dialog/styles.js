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
        ...(classes.text && {
          ['& .' + classes.text]: {
            width: 'fit-content',
            ...theme.typography.h6,
            fontFamily: theme.typography.fontStacks.sansSerif,
            borderBottom: `4px solid ${theme.palette.secondary.light}`,
          },
        }),
      },
      content: {
        '$container $title + &': {
          padding: '16px 24px',
        },
        ...(classes.link && {
          ['& .' + classes.link]: {
            textDecoration: 'none',
            color: theme.palette.secondary.main,
            '&:hover, &:focus': {
              textDecoration: 'underline',
            },
            '&:active': {
              textDecoration: 'none',
              color: '#ffffff',
              backgroundColor: theme.palette.secondary.main,
            },
          },
        }),
      },
      actions: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '75%',
        padding: '16px 24px',
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
