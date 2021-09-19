import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Box,
  Collapse,
} from '@mui/material';
import { useMediaQueries } from 'src/utils/mui';
import { useToggle } from 'src/utils/react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';

const ListItemLink = (props) => {
  const { item } = props;
  return (
    <ListItem button key={item.href}>
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

const NestedList = (props) => {
  const { list } = props;
  const [isListOpen, toggle] = useToggle();
  return (
    <>
      <ListItem button onClick={() => toggle()} key={list.href}>
        <ListItemText primary={list.name} />
        {isListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isListOpen} timeout="auto" unmountOnExit>
        {list?.children.map(
          (child) =>
            child.type === 'item' && (
              <ListItem button key={child.href} sx={{ pl: 4}}>
                <ListItemText secondary={child.name}/>
              </ListItem>
            )
        )}
      </Collapse>
    </>
  );
};


export const ResponsiveDrawer = (props) => {
  const { isOpen, setIsOpen, items } = props;
  const { isSmall } = useMediaQueries();
  const isTemporary = isSmall ?? true;
  const drawerWidth = 240;
  const handleDrawerClosed = () => {
    event.preventDefault();
    if (isTemporary) {
      setIsOpen(false);
    }
  };
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
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
        <Toolbar />
        <Divider />
        <List>
          {items?.children.map((child) =>
            child.type === 'list' ? (
              <NestedList list={child} key={child.href} />
            ) : (
              <ListItemLink item={child} key={child.href} />
            )
          )}
        </List>
      </Drawer>
    </Box>
  );
};
