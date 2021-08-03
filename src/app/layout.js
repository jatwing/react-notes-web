import { Box } from '@material-ui/core';
import { useStyles } from './styles';
import { Banner, Header, Footer } from 'sections';
import 'config/styles.css';

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Banner />
      <Header />
      <Box className={classes.content}>{children}</Box>
      <Footer />
    </Box>
  );
};

export { Layout };
