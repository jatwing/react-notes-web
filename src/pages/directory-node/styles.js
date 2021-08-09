import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    /** element */
    card: {
      width: '100%',
    },
    /** block */
    list: {
      margin: '0 0 -16px  0',
      overflow: 'visible',
    },
  };
});

export { useStyles };