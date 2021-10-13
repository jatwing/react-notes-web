import { Container } from 'src/components/layout/container';

export const MainContent = (props) => {
  const { children, sx } = props;
  return (
    <Container component="article" sx={sx}>
      {children}
    </Container>
  );
};
