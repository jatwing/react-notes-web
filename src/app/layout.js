import { Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'config/theme';
import Header from 'sections/header';
import './styles.css';
import 'config/fonts.css';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box className="content">{children}</Box>
    </ThemeProvider>
  );
};

export default Layout;
