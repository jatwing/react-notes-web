import { Box } from '@mui/material';
import { Header } from 'src/containers/header';
import { Sidebar } from 'src/containers/sidebar';
import { useToggle } from 'src/lib/react';
import { MainContent } from 'src/containers/main-content';
import { Footer } from 'src/containers/footer'

export const Page = (props) => {
  const { children } = props;
  const { value: isDrawerOpen, setOn, setOff } = useToggle();
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={isDrawerOpen} onClose={setOff} />
      <Box
        sx={{
          flexGrow: '1',
          display: 'flex',
          flexFlow: 'column nowrap',
          minHeight: '100vh',
        }}
      >
        <Header setOn={setOn} />
        <MainContent children={children} sx={{ 
// this one does not work, TODO pass sx
          flexGrow: '1' }}/>
        <Footer />
      </Box>
    </Box>
  );
};
