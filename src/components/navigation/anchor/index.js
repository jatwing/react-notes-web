import { Link as MuiLink  } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const isValidHttpUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

export const Anchor = (props) => {
  const { href, target, rel, children, sx, ...otherProps } = props;
  const newProps = {
    children,
    sx: {
      all: 'initial',
      color: 'inherit',
      ...sx,
    },
    ...otherProps,
  };
  if (isValidHttpUrl(href)) {
    newProps.href = href;
    newProps.target = target ?? '_blank';
    newProps.rel = rel ?? 'noreferrer noreferrer';
  } else {
    newProps.to = href;
    newProps.component = RouterLink;
  }
  return <MuiLink {...newProps} />;
};
