import { Box, createMuiTheme } from "@material-ui/core";
import classNameHelper from "utils/class-name-helper";
import style from "./style.module.css";
import { ThemeProvider } from "@material-ui/styles";
import Header from "components/header";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  },
  palette: {
    primary: {
      main: "#20232a",
      highlightText: "#61dafb"
    },
    secondary: {
      main: "#3f51b5"
    }
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
