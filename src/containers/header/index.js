import { GitHub, Menu, Notifications } from '@mui/icons-material';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import { AppBar } from 'src/components/surfaces/app-bar';
import { useMediaQueries } from 'src/lib/mui';
import { useNotifications } from 'src/redux/notifications/hooks';
import { useProjects } from 'src/redux/projects/hooks';
import { Logo } from 'src/containers/logo'
import { useToggle } from 'src/lib/react';
import { useState } from 'react'

export const Header = (props) => {
  const { setDrawerOpen  } = props;
  const { isSmall } = useMediaQueries();
  const projects = useProjects();
  const notifications = useNotifications();
  const { value: isPopoverOpen, setOn: setPopoverOpen, setOff: setPopoverClosed } = useToggle();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

    // the example set   const open = Boolean(anchorEl);


  const leftSlot = isSmall ? (
    <Box sx={{  display: 'flex', alignItems: 'center'  }}>   
    <IconButton onClick={setDrawerOpen} >
      <Menu />
    </IconButton>
    <Logo  sx={{ p: '8px' }}/>
    </Box>
  ) : (
    <span></span>
  );
  const rightSlot = (
    <Box sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <IconButton onClick={setPopoverOpen}>
        <Notifications />
      </IconButton>
      <Popover    open={isPopoverOpen} onClose={setPopoverClosed}>
        <Typography>{ 'tesdt popover '} </Typography>
      </Popover>
    </Box>
  );
  return (
    <AppBar>
      {leftSlot}
      {rightSlot}
    </AppBar>
  );
};
