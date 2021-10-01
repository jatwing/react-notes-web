import { AppBar } from 'src/components/surfaces/app-bar';
import { Link, Box, IconButton } from '@mui/material';
import { Menu, GitHub, Notifications } from '@mui/icons-material';
import { useMediaQueries } from 'src/lib/mui';
import { Anchor } from 'src/components/navigation/anchor';
import { useProjects } from 'src/redux/projects/hooks';
import { useNotifications } from 'src/redux/notifications/hooks';

export const Header = (props) => {
  const { setOn } = props;
  const { isSmall } = useMediaQueries();
  const projects = useProjects();
  const notifications = useNotifications();

  console.log(notifications);

  const leftSlot = isSmall ? (
    <IconButton size="small" onClick={setOn}>
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
  return <AppBar position="sticky" slots={[leftSlot, rightSlot]} />;
};
