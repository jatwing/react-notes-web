import { Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Code as MuiCode } from 'src/components/data-display/code';
import { Container } from 'src/components/layout/container';
import { pageItemCodes } from 'src/lib/pages';

export const Code = () => {
  const location = useLocation();
  const code = pageItemCodes[location.pathname];
  return (
    <Container component="aside">
      <Card variant="outlined">
        <MuiCode code={code} />
      </Card>
    </Container>
  );
};
