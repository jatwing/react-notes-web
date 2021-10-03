import { Container } from '@mui/material';

export const MainContent = (props) => {
  const { children, sx } = props;
  return (
    <Container
      component="main"
      sx={{
        ...sx,
        '&.MuiContainer-root': { padding: '40px' },
      }}
    >
      {children}
    </Container>
  );
};
