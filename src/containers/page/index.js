import { Box } from '@mui/material';
import { Header } from 'src/containers/header';
import { NavigationDrawer } from 'src/containers/navigation-drawer';
import { useToggle } from 'src/lib/react';
import { MainContent } from 'src/containers/main-content';
import { Footer } from 'src/containers/footer';

export const Page = (props) => {
  const { children } = props;
  const { value: isDrawerOpen, setOn, setOff } = useToggle();
  return (
    <Box sx={{ display: 'flex' }}>
      <NavigationDrawer open={isDrawerOpen} onClose={setOff} />
      <Box
        sx={{
          flexGrow: '1',
          display: 'flex',
          flexFlow: 'column nowrap',
          minHeight: '100vh',
        }}
      >
        <Header setOn={setOn} />
        <MainContent
          children={children}
          sx={{
            flexGrow: '1',
          }}
        />
        <Footer />
      </Box>
    </Box>
  );
};
