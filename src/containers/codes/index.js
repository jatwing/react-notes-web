import { Box, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Code } from 'src/components/data-display/code';
import { pageItemCodes } from 'src/lib/pages';

export const Codes = () => {
  const location = useLocation();
  const codes = pageItemCodes[location.pathname];
  return (
    <Box component="aside">
      {codes?.map((code) => (
        <Card
          variant="outlined"
          key={code}
          sx={{
            my: {
              xs: '24px',
              sm: '32px',
            },
          }}
        >
          <Code code={code} />
        </Card>
      ))}
    </Box>
  );
};
