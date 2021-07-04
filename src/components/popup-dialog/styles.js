import { makeStyles } from '@material-ui/styles';

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
    return {
      /** modifier */

      /** element */

      /** block */
      title: {
        display: 'flex',
        justifyContent: 'center',
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
      },

      content: {
        backgroundColor: '#ffffff',
        '$container $title + &': {
          paddingTop: '20px',
        },
        ...(classes.text && {
          ['& .' + classes.text]: {},
        }),
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
      },

      /** container */
      container: {},
    };
  });

export default useStyles;
