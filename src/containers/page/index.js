import { Box, Divider } from '@mui/material';
import { createContext, useContext } from 'react';
import { Code } from 'src/containers/code';
import { Footer } from 'src/containers/footer';
import { Header } from 'src/containers/header';
import { MainContent } from 'src/containers/main-content';
import { NavigationDrawer } from 'src/containers/navigation-drawer';
import { useToggle } from 'src/lib/react';

import { Container } from '@mui/material';

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
              mt: {
                xs: '56px',
                sm: '64px',
              },
            }}
          >
    {/*
            <MainContent
              children={children}
              sx={{
                flexGrow: '1',
              }}
            />
*/}
            <Code />
          </Box>


    {/*
          <Container sx={{ 
             // width: '200px',
              background: 'green',
              boxSizing: 'content-box',
           //   width: 'calc(100% - 48px)',
                overflowX: 'auto',
          }}>
            {'test'}
            <Box sx={{  
                width: '2400px', 
                background: 'red',
              //  overflowX: 'auto',
            }} >{'test box'}
          </Box>
          </Container>
*/}

          <Divider />
          <Footer />
        </Box>
      </Box>
    </PageContext.Provider>
  );
};
