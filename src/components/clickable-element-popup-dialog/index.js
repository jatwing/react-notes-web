import { Fragment, useState } from 'react';
import { Box } from '@material-ui/core'
import PopupDialog from 'components/popup-dialog';

const ClickableElementPopupDialog = (props) => {
  const { element, content, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <Fragment>
      <Box onClick={handleClick}>{element}</Box>
      <PopupDialog isOpen={isOpen} setIsOpen={setIsOpen} {...otherProps}>
        {content}
      </PopupDialog>
    </Fragment>
  );
};

export default ClickableElementPopupDialog;
