import { Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Code } from 'src/components/data-display/code';
import { Container } from 'src/components/layout/container';
import { pageItemCodes } from 'src/lib/pages';

export const Codes = () => {
  const location = useLocation();
  const codes = pageItemCodes[location.pathname];
  return (
    <Container component="aside">
      {codes?.map((code) => (
        <Card variant="outlined">
          <Code code={code} key={code} />
        </Card>
      ))}
    </Container>
  );
};
