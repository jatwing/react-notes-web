import { Container as MuiContainer } from '@mui/material';

export const Container = (props) => {
  const { children, component, sx } = props;
  const newProps = {
    children,
    component,
    sx: {
      '&.MuiContainer-root': {
        p: {
          xs: '24px',
          sm: '32px',
        },
      },
    },
  };
  return <MuiContainer {...newProps} />;
};
