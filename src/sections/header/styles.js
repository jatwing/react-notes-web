import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  /** modifier */
  /** element */
  link: {},
  title: {},
  /** block */
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 32px',
    '& $link, & $title': {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      ...theme.typography.h6,
      fontFamily: theme.typography.fontStacks.sansSerif,
      padding: `0 16px`
    },
    '& $link': {
      color: theme.palette.primary.contrastText,
      transition: theme.transitions.create('color'),
      '&:hover': {
        color: theme.palette.primary.highlightText,
        textDecoration: 'none',
      },
      '&:focus': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
      },
    },
    '& $title': {
      color: theme.palette.primary.highlightText,
      position: 'relative',
      '&::after': {
        width: '100%',
        height: '4px',
        content: '""',
        backgroundColor: theme.palette.primary.highlightText,
        position: 'absolute',
        left: '0',
        bottom: '0',
      },
    },
  },
  /** container */
  container: {},
}));

export default useStyles;
