import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { useMediaQueries } from 'src/utils/mui';

/**
 * settings
 */

const drawerWidth = 240;

export const ResponsiveDrawer = (props) => {
  const { isOpen, setIsOpen } = props;
  const { isSmall } = useMediaQueries();

  /**
   * content of drawer
   * */
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary={'primary text 2'} />
        </ListItem>
        <ListItem>
          <ListItemText primary={'primary text 3'} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={'secondary text 3'} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={'secondary text 3'} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={'secondary  textext 3'} />
        </ListItem>
        <ListItem>
          <ListItemText primary={'primary text 3'} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={'secondary text 3'} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={'secondary text 3'} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={'secondary  textext 3'} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={'primary text 3'} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={'secondary text 3'} />
        </ListItem>
        <ListItem button>
          <ListItemText secondary={'secondary text 3'} />
        </ListItem>
        <ListItem>
          <ListItemText secondary={'secondary  textext 3'} />
        </ListItem>
      </List>
    </div>
  );

  /**
   * later on need to deal with
   *   - resposive issue
   *   - overflow issue
   * */

  const isTemporary = isSmall ?? true;
  const handleDrawerClosed = () => {
    if (isTemporary) {
      setIsOpen(false);
    }
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {isSmall ?? true ? (
        <Drawer
          variant={isTemporary ? 'temporary' : 'permanent'}
          open={isTemporary ? isOpen : true}
          onClose={handleDrawerClosed}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};
