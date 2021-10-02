import { Container } from '@mui/material';

export const MainContent = (props) => {
  const { children } = props;
  return (
    <Container
      component="main"
      sx={{
        '&.MuiContainer-root': { padding: '40px' },



        flexGrow: '1'



      }}
    >
      {children}
    </Container>
  );
};
