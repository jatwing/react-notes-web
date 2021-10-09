import { Menu, Notifications } from '@mui/icons-material';
import { Box, IconButton, List, ListItemText, ListItem } from '@mui/material';
import { AppBar } from 'src/components/surfaces/app-bar';
import { useMediaQueries } from 'src/lib/mui';
import { useNotifications } from 'src/redux/notifications/hooks';
import { Logo } from 'src/containers/logo';
import { ClickableComponentWithPopover } from 'src/components/feedback/popover';
import { usePageContext } from 'src/containers/page';

const LeftSlot = () => {
  const { isSmall } = useMediaQueries();
  const { setDrawerOpen } = usePageContext();
  return isSmall ? (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={setDrawerOpen}>
        <Menu />
      </IconButton>
      <Logo sx={{ p: '8px' }} />
    </Box>
  ) : (
    <span></span>
  );
};

const RightSlot = () => {
  const notifications = useNotifications();
  return (
    <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <ClickableComponentWithPopover
        component={
          <IconButton>
            <Notifications />
          </IconButton>
        }
        content={
          notifications.isSucceed ? (
            <List>
              {notifications.entities.map((entity) => (
                <ListItem key={entity.content}>
                  <ListItemText>{entity.content}</ListItemText>
                </ListItem>
              ))}
            </List>
          ) : (
            <></>
          )
        }
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Box>
  );
};

export const Header = () => {
  return (
    <AppBar>
      <LeftSlot />
      <RightSlot />
    </AppBar>
  );
};
