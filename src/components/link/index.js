import { Link as MaterialLink } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const Link = ({ href, onClick, ...props }) => {
  const history = useHistory();
  const handleClick = (event) => {
    event.preventDefault();
    const result = onClick && onClick();
    if (href && result !== false) {
      history.push(href);
    }
  };
  return <MaterialLink href={href} onClick={handleClick} {...props} />;
};

export default Link;
