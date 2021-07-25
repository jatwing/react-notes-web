import { makeStyles } from '@material-ui/styles';
import { getMediaQueries } from 'utils/media';

const useStyles = (classes) =>
  makeStyles((theme) => {
    const { mediumQuery, largeQuery } = getMediaQueries(theme);
    return {
      /** element */
      icon: {
        position: 'absolute',
        right: '8px',
        top: '8px',
        color: theme.palette.text.disabled,
        '&:hover, &:focus': {
          color: theme.palette.text.secondary,
        },
        '&:active': {
          color: theme.palette.text.primary,
        },
      },

      /** block */
      title: {
        ...(classes.text && {
          ['& .' + classes.text]: {
            width: 'fit-content',
            ...theme.typography.h6,
            fontFamily: theme.typography.fontStacks.sansSerif,
          },
        }),
      },
      content: {
        ...(classes.link && {
          ['& .' + classes.link]: {
            textDecoration: 'none',
            ...theme.typography.body1,
            fontFamily: theme.typography.fontStacks.serif,
            color: theme.palette.secondary.main,
            '&:hover, &:focus': {
              textDecoration: 'underline',
              color: theme.palette.secondary.dark,
            },
            '&:active': {
              textDecoration: 'none',
            },
          },
        }),
      },
      actions: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '75%',
        padding: '8px 24px',
        margin: '0 auto 0 auto',
        ...(classes.button && {
          ['& .' + classes.button]: {
            textDecoration: 'none',
            ...theme.typography.button,
            fontFamily: theme.typography.fontStacks.sansSerif,
            color: theme.palette.secondary.main,
            '&:hover, &:focus': {
              textDecoration: 'underline',
              color: theme.palette.secondary.dark,
            },
            '&:active': {
              textDecoration: 'none',
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
