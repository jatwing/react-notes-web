import { SvgIcon } from '@mui/material';
import { useTheme } from '@mui/styles';

export const ReactNotesIcon = (props) => {
  const { variant, ...otherProps } = props;
  const isColorful = variant === 'colorful';
  const theme = useTheme();
  return (
    <SvgIcon {...otherProps}>
      <path
        d="M9.316 0A3 3 0 009.316 6L21 6A3 3 0 0021 0"
        style={{
          stroke: 'none',
          fill: isColorful ? theme.palette.react.dark : 'currentcolor',
        }}
      />
      <path
        d="M3 9A3 3 0 003 15L5.684 15A3 3 0 005.684 9"
        style={{
          stroke: 'none',
          fill: isColorful ? theme.palette.redux.dark : 'currentcolor',
        }}
      />
      <path
        d="M17.526 9A3 3 0 0017.526 15L21 15A3 3 0 0021 9"
        style={{
          stroke: 'none',
          fill: isColorful ? theme.palette.redux.dark : 'currentcolor',
        }}
      />
      <path
        d="M3 18A3 3 0 003 24L14.684 24A3 3 0 0014.684 18"
        style={{
          stroke: 'none',
          fill: isColorful ? theme.palette.saga.dark : 'currentcolor',
        }}
      />
    </SvgIcon>
  );
};
