import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  /** modifier */
  major: {},
  minor: {},
  /** element */
  corner: {
    display: "block",
    width: "32px",
    height: "32px",
    position: "absolute",
    right: "0",
    background: `linear-gradient(45deg, transparent 50%, ${theme.palette.secondary.light} 50%, ${theme.palette.secondary.dark})`,
  },
  link: {
    "&:hover": {
      textDecoration: "underline green"}
  },
  row: {
    padding: "16px",
  },
  text: {},
  /** block */
  header: {
    position: "relative",
    "& $row$major": {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
    },
    "& $row$major:hover": {
      color: theme.palette.primary.highlightText,
      textDecoration: "underline red",
    },

    "& $row$minor": {
      color: theme.palette.text.primary,
      backgroundColor: "#ffffff",
    },
    "& $text": {
      fontSize: theme.typography.h6.fontSize,
    },
  },

  content: {
    "& $row$major": {
      color: theme.palette.secondary.contrastText,
    },
    "& > *:nth-child(odd) $row$major": {
      backgroundColor: theme.palette.secondary.main,
    },
    "& > *:nth-child(even) $row$major": {
      backgroundColor: theme.palette.secondary.dark,
    },
    "& $row$minor": {
      color: theme.palette.text.secondary,
      borderTop: `1px dashed ${theme.palette.secondary.main}`,
    },
    "& $text": {
      fontSize: theme.typography.body1.fontSize,
    },
  },
  /** root */
  root: {
    marginBottom: "16px",
  },
}));

export default useStyles;
