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
  const { variant } = props;
  return (
    <SvgIcon {...props}>
      <path
        d="M 4.396 16.396 L 9.465 7.604"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          /** react blue, rgb(97, 218, 251), grayscale(186) */
          stroke: variant === 'colorful' ? '#61dafb' : 'currentColor', 
          fill: 'none',
          opacity: /** (255 - 186) / 255 */ '0.271',
        }}
      />
      <path
        d="M 14.535 16.396 L 19.604 7.604"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          /** saga green, rgb(134, 212, 107), grayscale(177) */
          stroke: variant === 'colorful' ? '#86d46b' : 'currentColor',
          fill: 'none',
          opacity: /** (255 - 177) / 255 */ '0.306',
        }}
      />
      <path
        d="M 9.465 7.604 L 14.535 16.396"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          /** redux purple, rgb(118, 74, 188), grayscale(100) */
          stroke: variant === 'colorful' ? '#764abc' : 'currentColor', 
          fill: 'none',
          opacity: /** (255 - 100) / 255 */ '0.608',
        }}
      />
    </SvgIcon>
  );
};
