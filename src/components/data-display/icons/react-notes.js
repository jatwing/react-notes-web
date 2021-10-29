import { SvgIcon } from '@mui/material';
import { useTheme } from '@mui/styles';

export const ReactNotesIcon = (props) => {
  const { variant, ...otherProps } = props;
  const isColorful = variant === 'colorful';
  const theme = useTheme();
  return (
    <SvgIcon {...otherProps}>
      <path
        d="M 4.396 16.396 L 9.465 7.604"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          /** react blue, rgb(97, 218, 251), grayscale(186) */
          stroke: isColorful ? theme.palette.react.main : 'currentColor',
          fill: 'none',
          /** (255 - 186) / 255 = 0.271 */
          opacity: isColorful ? '1' : '0.271',
        }}
      />
      <path
        d="M 14.535 16.396 L 19.604 7.604"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          /** saga green, rgb(137, 217, 109), grayscale(181) */
          stroke: isColorful ? theme.palette.saga.main : 'currentColor',
          fill: 'none',
          /** (255 - 181) / 255 = 0.290 */
          opacity: isColorful ? '1' : '0.290',
        }}
      />
      <path
        d="M 9.465 7.604 L 14.535 16.396"
        style={{
          strokeWidth: '8.792px',
          strokeLinecap: 'round',
          /** redux purple, rgb(118, 74, 188), grayscale(100) */
          stroke: isColorful ? theme.palette.redux.main : 'currentColor',
          fill: 'none',
          /** (255 - 100) / 255 = 0.608 */
          opacity: isColorful ? '1' : '0.608',
        }}
      />
    </SvgIcon>
  );
};
