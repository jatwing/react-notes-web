import { SvgIcon } from '@mui/material';
import { useTheme } from '@mui/styles';

export const ReactNotesIcon = (props) => {
  const { variant, ...otherProps } = props;
  const isColorful = variant === 'colorful';
  const theme = useTheme();
  return (
    <SvgIcon {...otherProps}>
      <path
        d="M0 .762A24 24 0 016 0L6 24 0 24"
        style={{
          stroke: 'none',
          fill: isColorful ? theme.palette.react.dark : 'currentcolor',
        }}
      />
      <path
        d="M9 0A15 15 0 0115 1.252L15 18A3 3 0 009 18"
        style={{
          stroke: 'none',
          fill: isColorful ? theme.palette.redux.dark : 'currentcolor',
        }}
      />
      <path
        d="M18 1.252A15 15 0 0124 6L24 21.708A9 9 0 0118 24"
        style={{
          stroke: 'none',
          fill: isColorful ? theme.palette.saga.dark : 'currentcolor',
        }}
      />
    </SvgIcon>
  );
};
