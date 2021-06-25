import { Box } from '@material-ui/core';
import Header from 'sections/header';

const Layout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Box className="content">{children}</Box>
    </Box>
  );
};

export default Layout;
