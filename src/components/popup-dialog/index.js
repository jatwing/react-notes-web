import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { useMedia } from 'utils/media';
import useStyles from './styles';
import clsx from 'clsx';

const PopupDialog = (props) => {
  const { isMedium, isLarge } = useMedia();
  let defaultMaxWidth = 'sm';
  if (isMedium) {
    defaultMaxWidth = 'md';
  } else if (isLarge) {
    defaultMaxWidth = 'lg';
  }
  const {
    title = '',
    children = null,
    hasButton = true,
    isOpen,
    setIsOpen,
    afterClose = () => {},
    fullWidth = true,
    maxWidth = defaultMaxWidth,
    classes = {},
  } = props;

  const handleClickClose = () => {
    setIsOpen(false);
    afterClose();
  };

  const innerClasses = useStyles();
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isOpen}
      onClose={handleClickClose}
      className={clsx(innerClasses.dialog, classes.dialog)}
    >
      {!!title && (
        <DialogTitle className={clsx(innerClasses.title, classes.title)}>
          {title}
        </DialogTitle>
      )}
      {!!children && (
        <DialogContent className={clsx(innerClasses.content, classes.content)}>
          {children}
        </DialogContent>
      )}
      {!!hasButton && (
        <DialogActions>
          <Button
            onClick={handleClickClose}
            className={clsx(innerClasses.button, classes.button)}
          >
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PopupDialog;
