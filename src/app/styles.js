import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    /** block */
    content: {
      flex: '1 1 0',
      margin: theme.spacing(2),
    },
    /** container  */
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      minHeight: '100vh',
    }
  };
});

export default useStyles;
