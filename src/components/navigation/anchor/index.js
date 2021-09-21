import { Link } from 'react-router-dom';
import style from './style.module.css';


const isValidHttpUrl = (urlString) => {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

export const Anchor = (props) => {
  const { href, children, ...otherProps } = props;
  /** external link */
  if (isValidHttpUrl(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" {...otherProps}
      className={style.anchor}
      >
        {children}
      </a>
    );
  }
  /** internal link or invalid link */
  return <Link to={href} className={style.anchor}>{children}</Link>;
};
