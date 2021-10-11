import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useToggle } from 'src/lib/react';
import { useMediaQueries } from 'src/lib/mui';
import { cloneElement } from 'react';

export const Dialog = (props) => {
  const { value: isDialogOpen, setOff: setDialogClosed } = useToggle();
  const { isMedium, isLarge } = useMediaQueries();
  const {
    title = '',
    content = null,
    actions = null,
    open = isDialogOpen,
    onClose = setDialogClosed,
    fullWidth = true,
    maxWidth = isLarge ? 'lg' : (isMedium ? 'md' : 'sm'),
    sx,
  } = props;
  const newProps = {
    open,
    onClose,
    fullWidth,
    maxWidth,
    sx,
  };
  return (
    <MuiDialog {...newProps}>
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: '8px',
          top: '8px',
        }}
      >
        <Close />
      </IconButton>
      {!!title && <DialogTitle>{title}</DialogTitle>}
      {!!content && <DialogContent>{content}</DialogContent>}
      {!!actions && (
        <DialogActions
          sx={{
            '&.MuiDialogActions-root .MuiButton-root': {
              color: 'secondary.main',
            },
          }}
        >
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export const ClickableComponentWithDialog = (props) => {
  const { component, title, content, actions, sx } = props;
  const {
    value: isDialogOpen,
    setOn: setDialogOpen,
    setOff: setDialogClosed,
  } = useToggle();
  const newProps = {
    title,
    content,
    actions,
    open: isDialogOpen,
    onClose: setDialogClosed,
    sx,
  };
  return (
    <>
      {cloneElement(component, {
        onClick: setDialogOpen,
      })}
      <Dialog {...newProps} />
    </>
  );
};
