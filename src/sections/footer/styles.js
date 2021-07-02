import { makeStyles } from '@material-ui/styles';
import { getMediaQueries } from 'utils/media';

const useStyles = makeStyles((theme) => {
  const { mediumQuery, largeQuery, mediumLargeQuery } = getMediaQueries(theme);
  return {
    /** modifier */
    /** element */
    image: {
      width: '48px',
      height: '48px',
      clipPath: 'circle(50%)',
      backgroundColor: '#ffffff',
    },
    text: {
      fontFamily: theme.typography.fontStacks.sansSerif,
      fontWeight: theme.typography.body1.fontWeight,
      lineHeight: theme.typography.body1.lineHeight,
      color: theme.palette.grey['500'],
      marginBottom: theme.spacing(1),
    },
    link: {
      display: 'block',
      fontFamily: theme.typography.fontStacks.sansSerif,
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.body1.fontWeight,
      lineHeight: theme.typography.body1.lineHeight,
      textDecoration: 'none',
      color: theme.palette.primary.contrastText,
      marginBottom: theme.spacing(1),
    },

/* copy from demo */
 form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },



/* copy from demo */


    /** block  */
    column: {
      '& $text': {
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    logo: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      marginTop: theme.spacing(1),
      [mediumLargeQuery]: {
        order: '-1',
        alignItems: 'flex-start',
        marginTop: '0',
      },
      '& $text': {
        fontSize: theme.typography.body1.fontSize,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
      },
    },

    columns: {
      width: '90%',
      padding: theme.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto',
      [mediumQuery]: {
        width: '75%',
      },
      [largeQuery]: {
        width: '60%',
      },
      '& $text': {},
    },

    /** container  */
    container: {
      backgroundColor: theme.palette.primary.main,
    },
  };
});

export default useStyles;
