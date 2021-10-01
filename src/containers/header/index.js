import { AppBar } from 'src/components/surfaces/app-bar';
import { Box } from '@mui/material';
import { Menu, GitHub, Notifications } from '@mui/icons-material';

export const Header = (props) => {
  const leftSlot = false ? <Menu /> : <span></span>;
  const rightSlot = (
    <Box sx={{ justifyContent: 'space-between' }}>
      <Notifications sx={{ fontSize: '2rem' }} />
      <GitHub />
    </Box>
  );
  return <AppBar position="sticky" slots={[leftSlot, rightSlot]} />;
};
