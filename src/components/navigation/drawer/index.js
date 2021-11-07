import { Close, ExpandMore } from '@mui/icons-material';
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
import { useEffect } from 'react';
import { LinkBase } from 'src/components/navigation/link';
import { useMediaQueries } from 'src/lib/mui';
import { useToggle } from 'src/lib/react';

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
        <ExpandMore  sx={{
          rotate: isListOpen ? '90deg' : '0',
          transition: (theme) => theme.transitions.create('rotate'),
        }}/>
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
  const { isLarge } = useMediaQueries();
  const drawerWidth = 256;
  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <MuiDrawer
        variant={isLarge ? 'permanent' : 'temporary'}
        open={isLarge ? true : open}
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
          {!isLarge && (
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          )}
          <LinkBase href="/" onClick={onClose}>
            <Button
              color="inherit"
              sx={{
                textTransform: 'capitalize',
                color: 'text.secondary',
                p: '8px',
              }}
            >
              {logo}
            </Button>
          </LinkBase>
        </Toolbar>
        <Divider />
        <List>
          {items?.children.map((child, index) =>
            child.type === 'list' ? (
              <NestedList
                list={child}
                onClose={onClose}
                key={child.url || index}
              />
            ) : child.type === 'item' ? (
              <ListItemLink
                item={child}
                onClose={onClose}
                key={child.url || index}
              />
            ) : null
          )}
        </List>
      </MuiDrawer>
    </Box>
  );
};
