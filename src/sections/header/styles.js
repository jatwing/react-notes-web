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
    '& $link, & $title': {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontStacks.sansSerif,
      fontSize: theme.typography.h6.fontSize,
      fontWeight: theme.typography.h6.fontWeight,
      lineHeight: theme.typography.h6.lineHeight,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    '& $link': {
      color: theme.palette.primary.contrastText,
      transition: 'color 1s linear',
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
        content: '""',
        width: '100%',
        height: theme.spacing(0.5),
        backgroundColor: theme.palette.primary.highlightText,
        position: 'absolute',
        left: '0',
        bottom: '0',
      },
    },
  },
  /** root */
  root: {},
}));

export default useStyles;
