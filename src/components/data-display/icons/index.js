import { SvgIcon } from '@mui/material';

export const JatwingIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M 1.143 2.571 l 21.714 0 l -10.857 18.857 l -5.429 -9.429"
        style={{
          strokeWidth: '2.286px',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          stroke: 'currentColor',
          fill: 'none',
          opacity: '0.586',
        }}
      />
      <path
        d="M 1.143 2.571 l 5.429 9.429 l 5.429 -9.429 l 5.429 9.429 l 5.429 -9.429"
        style={{
          strokeWidth: '2.286px',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          stroke: 'currentColor',
          fill: 'none',
          opacity: '0.414',
        }}
      />
    </SvgIcon>
  );
};

export const ReactNotesIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path
        d="M 14.535 16.396 L 19.604 7.604"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          stroke: '#86d46b',
          /** rgb(134, 212, 107) */
          fill: 'none',
        }}
      />
      <path
        d="M 9.465 7.604 L 14.535 16.396"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          stroke: '#764abc', /** rgb(118, 74, 188) */
          fill: 'none',
        }}
      />
      <path
        d="M 4.396 16.396 L 9.465 7.604"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          stroke: '#61dafb', /** rgb(97, 218, 251) */
          fill: 'none',
        }}
      />
    </SvgIcon>
  );
};
