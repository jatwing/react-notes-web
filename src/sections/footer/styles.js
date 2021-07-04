import { makeStyles } from '@material-ui/styles';
import { getMediaQueries } from 'utils/media';

const useStyles = makeStyles((theme) => {
  const { largeQuery, mediumLargeQuery } = getMediaQueries(theme);
  return {
    /** modifier */
    /** element */
    image: {
      width: '64px',
      height: '64px',
      clipPath: 'circle(50%)',
      backgroundColor: '#ffffff',
      marginBottom: theme.spacing(1),
    },
    text: {},
    link: {},
    /** block  */
    column: {
      '& $text': {
        display: 'block',
        width: 'fit-content',
        ...theme.typography.h6,
        fontFamily: theme.typography.fontStacks.sansSerif,
        color: theme.palette.grey['500'],
      },
      '& $link': {
        display: 'block',
        width: 'fit-content',
        ...theme.typography.body1,
        fontFamily: theme.typography.fontStacks.sansSerif,
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
        cursor: 'pointer',
        marginTop: theme.spacing(1),
      },
    },
    logo: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      marginTop: theme.spacing(2),
      [mediumLargeQuery]: {
        order: '-1',
        alignItems: 'flex-start',
        marginTop: '0',
      },
      '& $text': {
        ...theme.typography.body1,
        fontFamily: theme.typography.fontStacks.sansSerif,
        color: theme.palette.grey['500'],
      },
    },
    /** container  */
    container: {
      backgroundColor: theme.palette.primary.main,
    },
    innerContainer: {
      width: '90%',
      padding: theme.spacing(4),
      margin: '0 auto',
      [largeQuery]: {
        width: '60%',
      },
    },
  };
});

export default useStyles;
