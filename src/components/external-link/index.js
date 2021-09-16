/**
 * can internal link and external link be combined?
 *
 * it would blend with react-dom-router
 */
export const ExternalLink = (props) => {
  const {
    text,
    children,
    href,
    target = '_blank',
    rel = 'noreferrer',
    ...otherProps
  } = props;

  return (
    <a href={href} target={target} rel={rel} {...otherProps}>
      {text ? text : children}
    </a>
  );
};
