import { Box, createMuiTheme } from "@material-ui/core";
import classNameHelper from "utils/class-name-helper";
import style from "./style.module.css";
import { ThemeProvider } from "@material-ui/styles";
import Header from "components/header";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#20232a",
      highlightText: "#61dafb"
    },
    secondary: {
      main: "#3f51b5"
    }


   // secondary: {
   //   main: "#20232a",
  //    contrastText: "#61dafb",
  //  }
  },
});

const cls = classNameHelper(style);

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box className={cls("content")}>{children}</Box>
    </ThemeProvider>
  );
};

export default Layout;
