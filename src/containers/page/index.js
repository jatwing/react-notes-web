import { Box, Button } from '@mui/material';
import { useToggle } from 'src/lib/react';
import { Sidebar } from 'src/containers/sidebar'

import { Header } from 'src/containers/header';

export const Page = () => {
  const { value: isDrawerOpen, setOn, setOff } = useToggle();
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={isDrawerOpen} onClose={setOff} />
      <Box sx={{ flexGrow: '1', display: 'flex', flexFlow: 'column nowrap', minHeight: '100vh' }}>
        <Header />
        <div sx={{ flex: '1', padding: '32px' }}>
          <Box sx={{ height: '1000px',  }}>
            {'test'}
          </Box>
          <Button onClick={setOn}>{'test button'}</Button>
        </div>
      </Box>
    </Box>
  );
};
