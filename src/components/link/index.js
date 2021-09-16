import { Link as MaterialLink } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const Link = (props) => {
  const { href, onClick, ...otherProps } = props;
  const history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();
    const result = onClick && onClick();
    if (href && result !== false) {
      history.push(href);
    }
  };

  return <MaterialLink href={href} onClick={handleClick} {...otherProps} />;
};
