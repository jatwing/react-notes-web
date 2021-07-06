import { makeStyles } from '@material-ui/styles';
import { getMediaQueries } from 'utils/media';

const useStyles = makeStyles((theme) => {
  const { largeQuery, mediumLargeQuery } = getMediaQueries(theme);
  return {
    /** element */
    text: {},
    link: {},
    image: {},
    /** block  */
    column: {
      '& $text': {
        display: 'block',
        width: 'fit-content',
        ...theme.typography.body1,
        fontFamily: theme.typography.fontStacks.sansSerif,
        fontWeight: theme.typography.fontWeightBold,
        textTransform: 'uppercase',
        color: theme.palette.contrast.text.secondary,
      },
      '& $link': {
        display: 'block',
        width: 'fit-content',
        ...theme.typography.body1,
        fontFamily: theme.typography.fontStacks.sansSerif,
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
        transition: theme.transitions.create('color'),
        cursor: 'pointer',
        marginTop: '8px',
        '&:hover, &:focus': {
          textDecoration: 'underline',
          color: theme.palette.contrast.text.secondary,
        },
      },
    },
    logo: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      marginTop: '16px',
      [mediumLargeQuery]: {
        order: '-1',
        alignItems: 'flex-start',
        marginTop: '0',
      },
      '& $image': {
        width: '64px',
        height: '64px',
        clipPath: 'circle(50%)',
        backgroundColor: theme.palette.primary.contrastText,
        transition: theme.transitions.create('background-color'),
        marginBottom: '8px',
        '&:hover, &:focus': {
          backgroundColor: theme.palette.contrast.text.secondary,
        },
      },
      '& $text': {
        ...theme.typography.body1,
        fontFamily: theme.typography.fontStacks.sansSerif,
        color: theme.palette.contrast.text.secondary,
      },
    },
    /** container  */
    container: {
      backgroundColor: theme.palette.primary.main,
    },
    internalContainer: {
      width: '90%',
      padding: '32px',
      margin: '0 auto',
      [largeQuery]: {
        width: '60%',
      },
    },
  };
});

export default useStyles;
