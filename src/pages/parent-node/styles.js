import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    /** modifier */
    primary: {},
    secondary: {},
    /** element */
    row: {
      padding: "16px",
    },

    text: {
      fontSize: "100px",
    },

    /** block */
    header: {
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
        borderTop: `1px dashed ${theme.palette.secondary.light}`,
      },
    },
    /** root */
    root: {
      marginBottom: "16px",
    },
  };
});

export default useStyles;
