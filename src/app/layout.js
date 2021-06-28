import { Box } from '@material-ui/core';
import useStyles from './styles';
import Header from 'sections/header';

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Box className={classes.content}>{children}</Box>
    </>
  );
};

export default Layout;
