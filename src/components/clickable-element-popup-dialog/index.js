import { Box } from '@material-ui/core';
import { useState } from 'react';
import { PopupDialog } from 'src/components/popup-dialog';

export const ClickableElementPopupDialog = (props) => {
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
    <>
      <Box onClick={handleClickElement}>{element}</Box>
      <PopupDialog isOpen={isOpen} setIsOpen={setIsOpen} {...otherProps}>
        {content}
      </PopupDialog>
    </>
  );
};
