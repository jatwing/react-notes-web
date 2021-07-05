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
      padding: `0 16px`,
    },
    '& $link': {
      textDecoration: 'none',
      color: theme.palette.primary.contrastText,
      transition: theme.transitions.create('color'),
      '&:hover, &:focus': {
        color: theme.palette.grey['300'],
      },
      '&:active': {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
      },
    },
    '& $title': {
      color: 'black',
      position: 'relative',
      '&::after': {
        width: '100%',
        height: '4px',
        content: '""',
        backgroundColor: 'currentcolor',
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
