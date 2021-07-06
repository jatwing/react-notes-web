import { Fragment } from 'react';
import { Box } from '@material-ui/core';
import PopupDialog from 'components/popup-dialog';

const ClickableElementPopupDialog = (props) => {
  const { element, content, setIsOpen, ...otherProps } = props;
  const handleClickElement = () => {
    setIsOpen(true);
  };
  return (
    <Fragment>
      <Box onClick={handleClickElement}>{element}</Box>
      <PopupDialog setIsOpen={setIsOpen} {...otherProps}>{content}</PopupDialog>
    </Fragment>
  );
};

export default ClickableElementPopupDialog;
