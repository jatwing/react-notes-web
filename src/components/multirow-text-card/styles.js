import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    /** modifier */
    default: {},
    gradient: {},
    /** element */
    link: {
      textDecoration: 'none',
    },
    item: {
      padding: '16px 24px',
    },
    text: {},
    divider: {
      '&$gradient': {
        display: 'none',
      },
    },
    /** block */
    list: {
      padding: '0',
      '& > *:nth-child(1) $item': {
        '&$default': {
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: '32px',
            height: '32px',
            clipPath: 'polygon(0 0, 32px 0, 32px 32px)',
            position: 'absolute',
            right: '0',
            top: '0',
            backgroundColor: theme.palette.secondary.main,
            transition: theme.transitions.create('background-color'),
          },
          '&:hover, &:focus': {
            '&::after': {
              backgroundColor: theme.palette.primary.main,
            },
          },
        },
        '&$gradient': {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          '&:hover, &:focus': {
            backgroundColor: '#000000',
          },
        },
      },
      '& > *:nth-child(1) $text': {
        ...theme.typography.h6,
        fontFamily: theme.typography.fontStacks.sansSerif,
        '&$default': {
          color: theme.palette.text.primary,
        },
      },
      '& > *:nth-child(n + 3) $item': {
        '&$gradient': {
          transition: theme.transitions.create('background-color'),
          '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
      '& > *:nth-child(n + 3) $text': {
        ...theme.typography.body1,
        fontFamily: theme.typography.fontStacks.serif,
        '&$default': {
          color: theme.palette.text.secondary,
        },
      },
      '& > *:nth-child(3n + 3) $item': {
        '&$gradient': {
          color: theme.palette.secondary.contrastText,
          backgroundColor: theme.palette.secondary.light,
        },
      },
      '& > *:nth-child(3n + 4) $item': {
        '&$gradient': {
          color: theme.palette.secondary.contrastText,
          backgroundColor: theme.palette.secondary.main,
        },
      },
      '& > *:nth-child(3n + 5) $item': {
        '&$gradient': {
          color: theme.palette.secondary.contrastText,
          backgroundColor: theme.palette.secondary.dark,
        },
      },
    },
    /** container */
    container: {},
  };
});

export default useStyles;
