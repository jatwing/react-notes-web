import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  /** modifier */
  major: {},
  minor: {},
  /** element */
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  row: {
    padding: '16px',
    '&:hover': {
      textDecoration: 'underline currentcolor',
    },
  },
  text: {},
  /** block */
  header: {
    '& $row$major': {
      color: theme.palette.primary.contrastText,
      transition: 'color 1s linear',
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        color: theme.palette.primary.highlightText,
      },
    },
    '& $row$minor': {
      color: theme.palette.text.primary,
      transition: 'padding 1s linear',
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
        background: `linear-gradient(${theme.palette.secondary.dark}, ${theme.palette.secondary.light})`,
      },
      '&:hover': {
        '&::after': {
          background: `linear-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.light})`,
        },
      },
    },
    '& $text': {
      fontSize: theme.typography.h6.fontSize,
    },
  },

  content: {
    '& $row$major': {
      color: theme.palette.secondary.contrastText,
      transition: 'background 1s linear',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    '& > *:nth-child(3n+1) $row$major': {
      backgroundColor: theme.palette.secondary.light,
    },
    '& > *:nth-child(3n+2) $row$major': {
      backgroundColor: theme.palette.secondary.main,
    },
    '& > *:nth-child(3n) $row$major': {
      backgroundColor: theme.palette.secondary.dark,
    },
    '& $row$minor': {
      color: theme.palette.text.secondary,
      borderTop: `1px dashed ${theme.palette.secondary.main}`,
      '&:hover': {
        '& $text': {
          fontSize: theme.typography.h6.fontSize,
        },
      },
    },
    '& $text': {
      fontSize: theme.typography.body1.fontSize,
      transition: 'font-size 1s linear',
    },
  },
  /** root */
  root: {},
}));

export default useStyles;
