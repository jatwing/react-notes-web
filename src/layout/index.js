import { Box } from '@material-ui/core';
import { ThemeProvider  } from '@material-ui/core/styles';

import { StylesProvider } from '@material-ui/styles'

import theme from 'config/theme';
import classNameHelper from 'utils/class-name-helper';
import style from './style.module.css';
import Header from 'sections/header';



const cls = classNameHelper(style);

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
      <Header />
      <Box className={cls('content')}>{children}</Box>
      </StylesProvider>
    </ThemeProvider>
  );
};

export default Layout;
