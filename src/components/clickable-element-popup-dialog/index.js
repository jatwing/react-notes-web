import { useState, Fragment } from 'react';
import { Box } from '@material-ui/core';
import { PopupDialog } from 'components';

const ClickableElementPopupDialog = (props) => {
  const [internalIsOpen, internalSetIsOpen] = useState(false);
  const {
    element,
    content,
    isOpen = internalIsOpen,
    setIsOpen = internalSetIsOpen,
    ...otherProps
  } = props;

  const handleClickElement = () => {
    setIsOpen(true);
  };
  return (
    <Fragment>
      <Box onClick={handleClickElement}>{element}</Box>
      <PopupDialog isOpen={isOpen} setIsOpen={setIsOpen} {...otherProps}>
        {content}
      </PopupDialog>
    </Fragment>
  );
};

export { ClickableElementPopupDialog };
