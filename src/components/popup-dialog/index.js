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
import { useTheme } from '@material-ui/core';

const PopupDialog = (props) => {
  const theme = useTheme();
  const { isMedium, isLarge } = useMedia(theme);
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

  const innerClasses = useStyles(classes)();
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isOpen}
      onClose={handleClickClose}
      className={clsx(innerClasses.container, classes.container)}
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
        <DialogActions className={clsx(innerClasses.actions, classes.actions)}>
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
