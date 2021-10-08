import { GitHub, Menu, Notifications } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { AppBar } from 'src/components/surfaces/app-bar';
import { useMediaQueries } from 'src/lib/mui';
import { useNotifications } from 'src/redux/notifications/hooks';
import { useProjects } from 'src/redux/projects/hooks';
import { Logo } from 'src/containers/logo'

export const Header = (props) => {
  const { setOn } = props;
  const { isSmall } = useMediaQueries();
  const projects = useProjects();
  const notifications = useNotifications();
  const leftSlot = isSmall ? (
    <Box sx={{  display: 'flex', alignItems: 'center'  }}>   
    <IconButton onClick={setOn} sx={{ mr: '8px'}}>
      <Menu />
    </IconButton>
    <Logo />
    </Box>
  ) : (
    <span></span>
  );
  const rightSlot = (
    <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <IconButton>
        <Notifications />
      </IconButton>
    </Box>
  );
  return (
    <AppBar>
      {leftSlot}
      {rightSlot}
    </AppBar>
  );
};
