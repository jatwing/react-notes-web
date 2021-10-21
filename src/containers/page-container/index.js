import { Box, Container, Divider } from '@mui/material';
import { createContext, useContext } from 'react';
import { Codes } from 'src/containers/codes';
import { Footer } from 'src/containers/footer';
import { Header } from 'src/containers/header';
import { NavigationDrawer } from 'src/containers/navigation-drawer';
import { useToggle } from 'src/lib/react';
import { Breadcrumbs } from 'src/containers/breadcrumbs';

const PageContext = createContext({});

export const usePageContext = () => {
  const context = useContext(PageContext);
  return context;
};

export const PageContainer = (props) => {
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
        <NavigationDrawer />
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
            }}
          >
            <Breadcrumbs 
              sx={{
                my: {
                  xs: '24px',
                  sm: '32px',
                },
              }}

             />
            <Box
              component="article"
              sx={{
                my: {
                  xs: '24px',
                  sm: '32px',
                },
              }}
            >
              {children}
            </Box>
            <Codes 
              sx={{
                my: {
                  xs: '24px',
                  sm: '32px',
                },
              }}

    />
          </Container>
          <Divider />
          <Footer />
        </Box>
      </Box>
    </PageContext.Provider>
  );
};
