import { Box } from '@material-ui/core';
import Header from 'sections/header';
import useStyles from './styles';

const Layout = ({ children }) => {
  return (
    <Box className={useStyles()}>
      <Header />
      <Box className="content">{children}</Box>
    </Box>
  );
};

export default Layout;
