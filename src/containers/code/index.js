import { Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Code as MuiCode } from 'src/components/data-display/code';
import { pageItemCodes } from 'src/lib/pages';

export const Code = () => {
  const location = useLocation();
  const code = pageItemCodes[location.pathname];
  return (
    <Container
      component="aside"
      sx={{
        '&.MuiContainer-root': { padding: '24px' },
      }}
    >
      <MuiCode code={code} />
    </Container>
  );
};
