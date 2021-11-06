import { Menu, Notifications } from '@mui/icons-material';
import { Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { ClickableComponentWithPopover } from 'src/components/feedback/popover';
import { SkeletonText } from 'src/components/feedback/skeleton';
import { AppBar } from 'src/components/surfaces/app-bar';
import { Logo } from 'src/containers/logo';
import { usePageContext } from 'src/containers/page';
import { useMediaQueries } from 'src/lib/mui';
import { useTranslation } from 'src/redux/i18n/hooks';
import { useNotifications } from 'src/redux/notifications/hooks';
import { useLanguageSwitcher } from 'src/redux/i18n/hooks'

const LeftSlot = () => {
  const { isLarge } = useMediaQueries();
  const { setDrawerOpen } = usePageContext();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        visibility: isLarge ? 'hidden' : 'visible',
      }}
    >
      <IconButton onClick={setDrawerOpen}>
        <Menu />
      </IconButton>
      <Logo sx={{ p: '8px' }} />
    </Box>
  );
};

const RightSlot = () => {
  const notifications = useNotifications();
  const t = useTranslation();

  const test = useLanguageSwitcher();
  console.log(test);

  return (
    <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <ClickableComponentWithPopover
        component={
          <IconButton>
            <Notifications />
          </IconButton>
        }
        content={
          !notifications.areAvailable || !t ? (
            <List>
              <ListItem>
                <ListItemText>
                  <SkeletonText variant="primary" />
                </ListItemText>
              </ListItem>
            </List>
          ) : notifications.entities.length === 0 ? (
            <List>
              <ListItem>
                <ListItemText
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {t('no_notifications_yet')}
                </ListItemText>
              </ListItem>
            </List>
          ) : (
            <List>
              {notifications.entities.map((entity) => (
                <ListItem key={entity.content}>
                  <ListItemText>{entity.content}</ListItemText>
                </ListItem>
              ))}
            </List>
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
