import { MDCRipple } from '@material/ripple';
import { MutableRefObject, useEffect, useRef } from 'react';

export const useRipple = (): MutableRefObject<any> => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      MDCRipple.attachTo(ref.current);
    }
  }, [ref]);
  return ref;
};
