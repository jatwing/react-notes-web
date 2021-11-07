import { Language, Menu, Notifications } from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Popover } from 'src/components/feedback/popover';
import { SkeletonText } from 'src/components/feedback/skeleton';
import { AppBar } from 'src/components/surfaces/app-bar';
import { Logo } from 'src/containers/logo';
import { usePageContext } from 'src/containers/page';
import { useMediaQueries } from 'src/lib/mui';
import { useLanguageSwitcher, useTranslation } from 'src/redux/i18n/hooks';
import { useNotifications } from 'src/redux/notifications/hooks';

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

const NotificationsContent = () => {
  const notifications = useNotifications();
  const t = useTranslation();
  return !notifications.areAvailable || !t ? (
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
  );
};

const LanguageContent = (props) => {
  const { handleClick } = props;
  const { language, supportedLanguages, changeLanguage, fixedT } =
    useLanguageSwitcher();
  return !language || !supportedLanguages || !changeLanguage || !fixedT ? (
    <List>
      <ListItem>
        <ListItemText>
          <SkeletonText variant="primary" />
        </ListItemText>
      </ListItem>
    </List>
  ) : (
    <List>
      {supportedLanguages.map((supportedLanguage) => (
        <ListItem disablePadding={true} key={supportedLanguage}>
          <ListItemButton
            selected={supportedLanguage === language}
            onClick={() => {
              changeLanguage(supportedLanguage);
              if (handleClick) {
                handleClick();
              }
            }}
          >
            {fixedT(supportedLanguage)(supportedLanguage.replaceAll('-', '_'))}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const RightSlot = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Popover
        component={
          <IconButton>
            <Language />
          </IconButton>
        }
        content={<LanguageContent />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
      <Popover
        component={
          <IconButton>
            <Notifications />
          </IconButton>
        }
        content={<NotificationsContent />}
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
