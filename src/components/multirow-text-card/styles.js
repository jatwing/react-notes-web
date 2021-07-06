import { makeStyles } from '@material-ui/styles';

/**
 * at this moment, my best practice is,
 *
 * under the 'block', listing all the 'element' defined in the index.js
 * everything ends up an 'element'
 *
 * all the pseudo-class, pseduo-element, or customized 'modifier'
 * location inside the 'element' curlybracket.
 * they will not generate more curlybrackets to prevent breacket-hell.
 *
 * so a string key would be
 * '&(block) ----- element',
 * '&(element) ----- pseduo / modifierd'
 */

const useStyles = makeStyles((theme) => {
  return {
    /** modifier */
    default: {},
    gradient: {},
    /** element */
    link: {},
    item: {},
    text: {},
    divider: {},
    /** block */
    list: {
      padding: '0',

      '& $link': {
        textDecoration: 'none',
      },

      '& $item': {
        padding: '16px 24px',
        '&$gradient': {
          transition: theme.transitions.create('background-color'),
        },
      },
      '& > *:nth-child(1) $item': {
        '&$default': {
          position: 'relative',
        },
        '&$default::after': {
          display: 'block',
          width: '32px',
          height: '32px',
          content: '""',
          clipPath: 'polygon(0 0, 32px 0, 32px 32px)',
          position: 'absolute',
          right: '0',
          top: '0',
          backgroundColor: theme.palette.secondary.main,
          transition: theme.transitions.create('background-color'),
        },
        '&$default:hover::after, &$default:focus::after': {
          backgroundColor: theme.palette.primary.main,
        },
        '&$gradient': {
          backgroundColor: theme.palette.primary.main,
        },
        '&$gradient:hover, &$gradient:focus': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
      '& > *:nth-child(3n + 3) $item': {
        '&$gradient': {
          backgroundColor: theme.palette.secondary.light,
        },
        '&$gradient:hover, &$gradient:focus': {
          backgroundColor: theme.palette.primary.light,
        },
      },
      '& > *:nth-child(3n + 4) $item': {
        '&$gradient': {
          backgroundColor: theme.palette.secondary.main,
        },
        '&$gradient:hover, &$gradient:focus': {
          backgroundColor: theme.palette.primary.main,
        },
      },
      '& > *:nth-child(3n + 5) $item': {
        '&$gradient': {
          backgroundColor: theme.palette.secondary.dark,
        },
        '&$gradient:hover, &$gradient:focus': {
          backgroundColor: theme.palette.primary.dark,
        },
      },

      '& > *:nth-child(1) $text': {
        ...theme.typography.h6,
        fontFamily: theme.typography.fontStacks.sansSerif,
        '&$default': {
          color: theme.palette.text.primary,
        },
        '&$gradient': {
          color: theme.palette.primary.contrastText,
        }
      },
      '& > *:nth-child(n + 3) $text': {
        ...theme.typography.body1,
        fontFamily: theme.typography.fontStacks.serif,
        '&$default': {
          color: theme.palette.text.secondary,
        },
        '&$gradient': {
          color: theme.palette.secondary.contrastText,
        },
      },
      
      '& $divider': {
        '&$gradient': {
          display: 'none',
        },
      },
    },
    /** container */
    container: {},
  };
});

export default useStyles;
