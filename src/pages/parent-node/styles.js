import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  /** modifier */
  primary: {},
  secondary: {},
  /** element */

  corner: {
    display: "block",
    width: "32px",
    height: "32px",
    clipPath: "polygon(0 0, 32px 0, 32px 32px)",
    background: `linear-gradient(45deg, ${theme.palette.secondary.light} 50%, ${theme.palette.secondary.dark})`,
    position: "absolute",
    right: 0,
  },

  corner2: {
    display: "block",
    width: `${32 * Math.sqrt(2)}px`,
    height: `${32 * Math.sqrt(2)}px`,
    transformOrigin: "top right",
    transform: "rotate(45deg)",
    position: "absolute",
    right: "-16px",
    backgroundColor: "yellow",
  },

  row: {
    padding: "16px",
  },
  /** block */
  header: {
    position: "relative",
    "& > $row$primary": {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
    "& > $row$secondary": {
      color: theme.palette.text.primary,
    },
  },
  content: {
    "& > $row$primary": {
      color: theme.palette.secondary.contrastText,
    },
    "& > $row$primary:nth-child(odd)": {
      backgroundColor: theme.palette.secondary.main,
    },
    "& > $row$primary:nth-child(even)": {
      backgroundColor: theme.palette.secondary.dark,
    },
    "& > $row$secondary": {
      color: theme.palette.text.secondary,
      borderTop: `1px dashed ${theme.palette.secondary.main}`,
    },
  },
  /** root */
  root: {
    marginBottom: "16px",
  },
}));

export default useStyles;
