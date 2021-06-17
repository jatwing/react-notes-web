import { Box, createMuiTheme } from "@material-ui/core";
import classNameHelper from "utils/class-name-helper";
import style from "./style.module.css";
import { ThemeProvider } from "@material-ui/styles";
import Header from "components/header";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#20232a",
      contrastText: "#61dafb",
    },
    secondary: {
      main: "#f44336",
      contrastText: "#000000",
    },
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
