import { Container } from '@mui/material';

export const MainContent = (props) => {
  const { children, sx } = props;
  return (
    <Container
      component="article"
      sx={{
        ...sx,
        '&.MuiContainer-root': { padding: '24px' },
      }}
    >
      {children}
    </Container>
  );
};
