import { GitHub, Menu, Notifications } from '@mui/icons-material';
import { Box, IconButton} from '@mui/material';
import { Anchor } from 'src/components/navigation/anchor';
import { AppBar } from 'src/components/surfaces/app-bar';
import { useMediaQueries } from 'src/lib/mui';
import { useNotifications } from 'src/redux/notifications/hooks';
import { useProjects } from 'src/redux/projects/hooks';

export const Header = (props) => {
  const { setOn } = props;
  const { isSmall } = useMediaQueries();
  const projects = useProjects();
  const notifications = useNotifications();
  const leftSlot = isSmall ? (
    <IconButton onClick={setOn}>
      <Menu />
    </IconButton>
  ) : (
    <span></span>
  );
  const rightSlot = (
    <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Anchor href={projects.isSucceed ? projects.entities[0].github : ''}>
        <IconButton>
          <GitHub />
        </IconButton>
      </Anchor>
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
