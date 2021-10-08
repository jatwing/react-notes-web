import { ExpandLess, ExpandMore, Close} from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonBase,
  Collapse,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/styles';
import { createElement, useEffect } from 'react';
import { useMediaQueries } from 'src/lib/mui';
import { useToggle } from 'src/lib/react';
import { LinkBase } from 'src/components/navigation/link'


const ListItemLink = (props) => {
  const { item, onClose } = props;
  return (
    <LinkBase href={item.href} onClick={onClose}>
      <ListItemButton selected={item.isSelected} key={item.href}>
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
      <ListItemButton onClick={toggle} key={list.href}>
        <ListItemText primary={list.name} />
        {isListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isListOpen} timeout="auto" unmountOnExit>
        {list?.children.map(
          (child) =>
            child.type === 'item' && (
              <LinkBase href={child.href} onClick={onClose} key={child.href}>
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
  const { open, onClose, items, logo, title } = props;
  const { isSmall } = useMediaQueries();
  const theme = useTheme();
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
        <Toolbar sx={{ 
          '&.MuiToolbar-root': {
            alignItems: 'center',
            px: '16px',
          }
        }}>
          { isSmall &&  <IconButton onClick={onClose} sx={{ mr: '8px' }}>
            <Close/>
          </IconButton> }
          <LinkBase  href="/" >
            <Button sx={{ p: '0' }}>
              { logo }
            </Button>
          </LinkBase>
        </Toolbar>
        <Divider />
        <List>
          {items?.children.map((child) =>
            child.type === 'list' ? (
              <NestedList list={child} onClose={onClose} key={child.href} />
            ) : (
              <ListItemLink item={child} onClose={onClose} key={child.href} />
            )
          )}
        </List>
      </MuiDrawer>
    </Box>
  );
};
