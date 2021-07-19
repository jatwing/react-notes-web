import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    /** modifier */
    hidden: {},
    /** element */
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 16px',
      '& p': {
        ...theme.typography.body1,
        fontFamily: theme.typography.fontStacks.serif,
        color: theme.palette.info.contrastText,
        padding: '0',
        margin: '0',
      },
      '&$hidden': {
        display: 'none'
      }
    },
    icon: {
      ...theme.typography.h6,
      color: theme.palette.text.primary,
      padding: '0',
      margin: 'auto 0',
      cursor: 'pointer',
      '&:hover, &:focus': {
        color: theme.palette.text.secondary,
      },
    },
    /** block */
    content: {
      '& div:nth-child(2n + 1)': {
        backgroundColor: theme.palette.info.light,
      },
      '& div:nth-child(2n)': {
        backgroundColor: theme.palette.info.main,
      },
    },
    /** container */
    container: {}
  };
});

export default useStyles;
