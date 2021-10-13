import { ExpandLess, ExpandMore, Close } from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { useMediaQueries } from 'src/lib/mui';
import { useEffect } from 'react';
import { useToggle } from 'src/lib/react';
import { LinkBase } from 'src/components/navigation/link';

const ListItemLink = (props) => {
  const { item, onClose } = props;
  return (
    <LinkBase href={item.url} onClick={onClose}>
      <ListItemButton selected={item.isSelected}>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </LinkBase>
  );
};

const NestedList = (props) => {
  const { list, onClose } = props;
  const { value: isListOpen, setOn, toggle } = useToggle();
  useEffect(() => {
    if (list.isSelected) {
      setOn();
    }
  }, [list, setOn]);
  return (
    <>
      <ListItemButton onClick={toggle}>
        <ListItemText primary={list.name} />
        {isListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isListOpen} timeout="auto" unmountOnExit>
        {list?.children.map(
          (child) =>
            child.type === 'item' && (
              <LinkBase href={child.url} onClick={onClose} key={child.url}>
                <ListItemButton sx={{ pl: 4 }} selected={child.isSelected}>
                  <ListItemText secondary={child.name} />
                </ListItemButton>
              </LinkBase>
            )
        )}
      </Collapse>
    </>
  );
};

export const ResponsiveDrawer = (props) => {
  const { open, onClose, items, logo } = props;
  const { isSmall } = useMediaQueries();
  const isTemporary = isSmall ?? true;
  const drawerWidth = 256;
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <MuiDrawer
        variant={isTemporary ? 'temporary' : 'permanent'}
        open={isTemporary ? open : true}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <Toolbar
          sx={{
            '&.MuiToolbar-root': {
              alignItems: 'center',
              px: '16px',
            },
          }}
        >
          {isSmall && (
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          )}
          <LinkBase href="/" onClick={onClose}>
            <Button sx={{ p: '8px' }}>{logo}</Button>
          </LinkBase>
        </Toolbar>
        <Divider />
        <List>
          {items?.children.map((child) =>
            child.type === 'list' ? (
              <NestedList list={child} onClose={onClose} key={child.url} />
            ) : (
              <ListItemLink item={child} onClose={onClose} key={child.url} />
            )
          )}
        </List>
      </MuiDrawer>
    </Box>
  );
};
