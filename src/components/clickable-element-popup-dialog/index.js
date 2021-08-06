import { Box } from '@material-ui/core';
import { PopupDialog } from 'src/components';
import { useState } from 'react';

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
    <>
      <Box onClick={handleClickElement}>{element}</Box>
      <PopupDialog isOpen={isOpen} setIsOpen={setIsOpen} {...otherProps}>
        {content}
      </PopupDialog>
    </>
  );
};

export { ClickableElementPopupDialog };
