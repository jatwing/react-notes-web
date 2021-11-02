import { Box, Container, Divider } from '@mui/material';
import { createContext, useContext } from 'react';
import { Breadcrumbs } from 'src/containers/breadcrumbs';
import { Codes } from 'src/containers/codes';
import { Footer } from 'src/containers/footer';
import { Header } from 'src/containers/header';
import { Drawer } from 'src/containers/drawer';
import { Pagination } from 'src/containers/pagination';
import { useToggle } from 'src/lib/react';


const PageContext = createContext({});

export const usePageContext = () => {
  const context = useContext(PageContext);
  return context;
};

export const Page = (props) => {
  const { children } = props;
  const {
    value: isDrawerOpen,
    setOn: setDrawerOpen,
    setOff: setDrawerClosed,
  } = useToggle();
  return (
    <PageContext.Provider
      value={{ isDrawerOpen, setDrawerOpen, setDrawerClosed }}
    >
      <Box sx={{ display: 'flex' }}>
        <Drawer />
        <Box
          sx={{
            flexGrow: '1',
            display: 'flex',
            flexFlow: 'column nowrap',
            minHeight: '100vh',
          }}
        >
          <Header setDrawerOpen={setDrawerOpen} />
          <Container
            component="main"
            sx={{
              flexGrow: '1',
              px: {
                xs: '24px',
                sm: '32px',
              },
              mt: {
                xs: '56px',
                sm: '64px',
              },
              '& > .MuiTypography-root, & > .MuiBox-root, & > .MuiPaper-root': {
                my: {
                  xs: '24px',
                  sm: '32px',
                },
              },
            }}
          >
            <Breadcrumbs />
            <Box children={children} component="article" />
            <Codes />
            <Pagination />
          </Container>
          <Divider />
          <Footer />
        </Box>
      </Box>
    </PageContext.Provider>
  );
};
