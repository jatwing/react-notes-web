import { Fragment, useState } from 'react';
import PopupDialog from 'components/popup-dialog';

const ClickableElementPopupDialog = (props) => {
  const { element, children, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <Fragment>
      <Fragment onClick={handleClick}>{element}</Fragment>
      <PopupDialog isOpen={isOpen} setIsOpen={setIsOpen} {...otherProps}>
        {children}
      </PopupDialog>
    </Fragment>
  );
};

export default ClickableElementPopupDialog;
