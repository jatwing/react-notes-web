import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useMediaQueries } from 'src/utils/mui';
import { useToggle } from 'src/utils/react';
import { Anchor } from 'src/components/navigation/anchor';
import { useTheme } from '@mui/styles';


/**
 * the selected item should based on the URL
 * how to combine router-dom with this
 * guess that the url should be store inside the center store.
 */


const ListItemLink = (props) => {
  const { item } = props;
  return (
    <Anchor href={item.href}>
      <ListItemButton key={item.href} selected>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </Anchor>
  );
};

const NestedList = (props) => {
  const { list } = props;
  const [isListOpen, toggle] = useToggle();
  return (
    <>
      <ListItemButton onClick={() => toggle()} key={list.href}>
        <ListItemText primary={list.name} />
        {isListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isListOpen} timeout="auto" unmountOnExit>
        {list?.children.map(
          (child) =>
            child.type === 'item' && (
              <Anchor href={child.href} key={child.href}>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText secondary={child.name} />
                </ListItemButton>
              </Anchor>
            )
        )}
      </Collapse>
    </>
  );
};

export const ResponsiveDrawer = (props) => {
  const { isOpen, setIsOpen, items, Logo, title } = props;
  const { isSmall } = useMediaQueries();
  const  theme  = useTheme();


  const isTemporary = isSmall ?? true;
  const drawerWidth = 256;
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
        <Toolbar sx={{ justifyContent: 'space-between'  }}>
          <Logo color="primary"  sx={{ fontSize: 32  }}   />
          <Typography variant="body1" component="span" sx={{ fontFamily:  theme.typography.fontFamilies.monospace }} >
            {title}
          </Typography>
        </Toolbar>
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
