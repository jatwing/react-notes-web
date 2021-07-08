import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  /** element */
  link: {},
  title: {},
  /** block */
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.main,
    padding: '0 32px',

    '& $link, & $title': {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      ...theme.typography.h6,
      fontFamily: theme.typography.fontStacks.sansSerif,
      color: theme.palette.primary.contrastText,
      transition: theme.transitions.create('color'),
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      padding: '0 16px',
      '&:hover, &:focus': {
        color: theme.palette.contrast.text.secondary,
      },
    },
    '&:hover $link, &:hover $title, &:focus $link, &:focus $title': {
      color: theme.palette.contrast.text.disabled,
    },

    '& $link': {
      textDecoration: 'none',
      '&:active': {
        backgroundColor: theme.palette.primary.light,
      },
    },

    '& $title': {
      position: 'relative',
      '&::after': {
        width: '100%',
        height: '4px',
        content: '""',
        backgroundColor: theme.palette.primary.contrastText,
        position: 'absolute',
        left: '0',
        bottom: '0',
      },
      '&:hover::after, &:focus::after': {
        backgroundColor: theme.palette.contrast.text.secondary,
      },
    },
  },
  /** container */
  container: {},
}));

export default useStyles;
