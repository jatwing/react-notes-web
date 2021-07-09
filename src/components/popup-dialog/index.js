import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useMedia } from 'utils/media';
import useStyles from './styles';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core';

const PopupDialog = (props) => {
  const {
    title = '',
    children = null,
    actions = null,
    isOpen,
    setIsOpen,
    afterClose = () => {},
    fullWidth = true,
    classes = {},
  } = props;
  let { maxWidth } = props;

  const theme = useTheme();
  const { isMedium, isLarge } = useMedia(theme);
  if (!maxWidth) {
    maxWidth = 'sm';
    if (isMedium) {
      maxWidth = 'md';
    } else if (isLarge) {
      maxWidth = 'lg';
    }
  }

  const handleClickClose = () => {
    setIsOpen(false);
    afterClose();
  };

  const internalClasses = useStyles(classes)();
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isOpen}
      onClose={handleClickClose}
      className={clsx(internalClasses.container, classes.container)}
    >
      <IconButton
        onClick={handleClickClose}
        className={clsx(internalClasses.icon, classes.icon)}
      >
        <CloseIcon />
      </IconButton>
      {!!title && (
        <DialogTitle className={clsx(internalClasses.title, classes.title)}>
          {title}
        </DialogTitle>
      )}
      {!!title && (!!children || !!actions) && <Divider />}
      {!!children && (
        <DialogContent
          className={clsx(internalClasses.content, classes.content)}
        >
          {children}
        </DialogContent>
      )}
      {!!children && !!actions && <Divider />}
      {!!actions && (
        <DialogActions
          className={clsx(internalClasses.actions, classes.actions)}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default PopupDialog;