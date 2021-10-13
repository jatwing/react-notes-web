import { Container, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Code as MuiCode } from 'src/components/data-display/code';
import { pageItemCodes } from 'src/lib/pages';
import { useMediaQueries } from 'src/lib/mui';

export const Code = () => {
  const location = useLocation();
  const code = pageItemCodes[location.pathname];
  const { isLarge, isMedium } = useMediaQueries();

  return (
    <Container
      component="aside"
      sx={{
        '&.MuiContainer-root': { padding: '24px' },
      }}
      maxWidth={isLarge ? 'lg' : (isMedium ? 'md' : 'xs') }
    >
      <Card variant="outlined">
    {isLarge ? 'lg' : (isMedium ? 'md' : 'sm') }
        <MuiCode code={code} />
      </Card>
    </Container>
  );
};
