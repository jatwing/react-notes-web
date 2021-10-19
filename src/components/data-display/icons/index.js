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
    return <SvgIcon {...props}>

  <line x1="14.535" y1="16.396" x2="19.604" y2="7.604" 
  style={{
    strokeWidth: '8.792px',
    strokeLinecap: 'round',
    stroke: '#86d46b',
    fill: 'none',
  }}
  />
  <line x1="9.465" y1="7.604" x2="14.535" y2="16.396"
    style={{
      strokeWidth: '8.792px',
      strokeLinecap: 'round',
      stroke: '#764abc',
      fill: 'none',
    }}
   />
  <line x1="4.396" y1="16.396" x2="9.465" y2="7.604" 
    style={{
      strokeWidth: '8.792px',
      strokeLinecap: 'round',
      stroke: '#61dafb',
      fill: 'none',
    }}
  />

    </SvgIcon>
}
