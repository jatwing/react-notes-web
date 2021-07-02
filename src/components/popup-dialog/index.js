import { useState } from 'react';
import {
  Fragment,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useMedia } from 'utils/media';
import { useStyles } from './styles';
import clsx from 'clsx';

const PopupDialog = (props) => {
  // data input, other parameter, css

  const { label, title, children, fullWidth, maxWidth, classes } = props;

  const [isOpen, setIsOpen] = useState(false);
  const handleClickLabel = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };
  const { isMedium, isLarge } = useMedia();
  let innerMaxWidth = 'sm';
  if (isMedium) {
    innerMaxWidth = 'md';
  } else if (isLarge) {
    innerMaxWidth = 'lg';
  }

  const innerClasses = useStyles();

  return (
    <Fragment className={clsx(innerClasses?.container, classes?.container)}>
      <Typography
        onClick={handleClickLabel}
        className={clsx(innerClasses?.label, classes?.label)}
      >
        {label}
      </Typography>
      <Dialog
        fullWidth={fullWidth ?? true}
        maxWidth={maxWidth || innerMaxWidth}
        open={isOpen}
        onClose={handleClickClose}
        className={clsx(innerClasses?.dialog, classes?.dialog)}
      >
        <DialogTitle className={clsx(innerClasses?.title, classes?.title)}>
          {title}
        </DialogTitle>
        <DialogContent
          className={clsx(innerClasses?.content, classes?.content)}
        >
          {children}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClickClose}
            className={clsx(innerClasses?.button, classes?.button)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default PopupDialog;
