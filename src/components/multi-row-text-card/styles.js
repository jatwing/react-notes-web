import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
  return {
    /** modifier */
    major: {},
    minor: {},
    /** element */
    link: {
      textDecoration: 'none',
    },
    row: {
      padding: theme.spacing(2),
      textDecoration: 'none',
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
          textDecoration: 'none',
        },
      },
      '& $row$minor': {
        color: theme.palette.text.primary,
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
        fontFamily: theme.typography.fontStacks.sansSerif,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: theme.typography.h6.fontWeight,
        lineHeight: theme.typography.h6.lineHeight,
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
        fontFamily: theme.typography.fontStacks.serif,
        fontSize: theme.typography.body1.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        lineHeight: theme.typography.body1.lineHeight,
        transition: 'font-size 1s linear',
      },
    },
    /** container */
    container: {},
  };
});

export default useStyles;
