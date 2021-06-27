import { Box } from '@material-ui/core';
import Header from 'sections/header';
import useStyles from './styles';
import { useTheme } from '@material-ui/core/styles'

const Layout = ({ children }) => {
  const theme =useTheme()
  return (
    <Box className={useStyles(theme)}>
      <Header />
      <Box className="content">{children}</Box>
    </Box>
  );
};

export default Layout;
