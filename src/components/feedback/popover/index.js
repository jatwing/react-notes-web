import Popover from '@mui/material/Popover';
import { cloneElement, useState } from 'react';
import { useToggle } from 'src/lib/react';

export const ClickableComponentWithPopover = (props) => {
  const {
    component,
    content,
    anchorReference = 'anchorEl',
    anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin = { vertical: 'top', horizontal: 'left' },
    anchorPosition = { left: 0, top: 0 },
    sx,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const { value: isPopoverOpen, setOff, toggle } = useToggle();
  const newProps = {
    anchorReference,
    ...(anchorReference === 'anchorEl' && {
      open: !!anchorEl,
      onClose: () => setAnchorEl(null),
      anchorEl,
      anchorOrigin,
      transformOrigin,
    }),
    ...(anchorReference === 'anchorPosition' && {
      open: isPopoverOpen,
      onClose: setOff,
      anchorPosition,
    }),
    sx,
  };
  const handleElementClicked = (event) => {
    if (anchorReference === 'anchorEl') {
      setAnchorEl(event.currentTarget);
    } else if (anchorReference === 'anchorPosition') {
      toggle();
    }
  };
  return (
    <>
      {cloneElement(component, {
        onClick: handleElementClicked,
      })}
      <Popover
        {...newProps}
        sx={{
          '&.MuiPopover-root > *': {
            minWidth: '256px',
          },
        }}
      >
        {content}
      </Popover>
    </>
  );
};
