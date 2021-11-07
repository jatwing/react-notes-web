import { Popover as MuiPopover } from '@mui/material';
import { cloneElement, useState } from 'react';
import { useToggle } from 'src/lib/react';

export const PopoverAnchorPosition = (props) => {
  const {
    component,
    content,
    anchorReference,
    anchorPosition = { left: 0, top: 0 },
    sx,
  } = props;
  const { value: isPopoverOpen, setOff, toggle } = useToggle();
  return (
    <>
      {cloneElement(component, {
        onClick: toggle,
      })}
      <MuiPopover
        anchorReference={anchorReference}
        anchorPosition={anchorPosition}
        open={isPopoverOpen}
        onClose={setOff}
        sx={{
          '&.MuiPopover-root > *': {
            minWidth: '256px',
          },
          ...sx,
        }}
      >
        {cloneElement(content, {
          handleClick: setOff,
        })}
        {content}
      </MuiPopover>
    </>
  );
};

export const PopoverAnchorElement = (props) => {
  const {
    component,
    content,
    anchorReference,
    anchorOrigin = {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin = { vertical: 'top', horizontal: 'left' },
    sx,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      {cloneElement(component, {
        onClick: (event) => setAnchorEl(event.currentTarget),
      })}
      <MuiPopover
        anchorReference={anchorReference}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        sx={{
          '&.MuiPopover-root > *': {
            minWidth: '256px',
          },
          ...sx,
        }}
      >
        {cloneElement(content, {
          handleClick: () => setAnchorEl(null),
        })}
      </MuiPopover>
    </>
  );
};

export const Popover = (props) => {
  const { anchorReference = 'anchorEl' } = props;
  if (anchorReference === 'anchorPosition') {
    return <PopoverAnchorPosition {...props} />;
  }
  return <PopoverAnchorElement {...props} />;
};
