import { Box, Divider } from '@mui/material';
import { createContext, useContext } from 'react';
import { Container } from 'src/components/layout/container';
import { Codes } from 'src/containers/codes';
import { Footer } from 'src/containers/footer';
import { Header } from 'src/containers/header';
import { MainContent } from 'src/containers/main-content';
import { NavigationDrawer } from 'src/containers/navigation-drawer';
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
          <Box
            component="main"
            sx={{
              flexGrow: '1',
              mt: {
                xs: '56px',
                sm: '64px',
              },
            }}
          >
            <Container component="article">{children}</Container>
            <Codes />
          </Box>
          <Divider />
          <Footer />
        </Box>
      </Box>
    </PageContext.Provider>
  );
};
