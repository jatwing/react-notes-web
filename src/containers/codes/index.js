import { Box, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Code } from 'src/components/data-display/code';
import { pageItemCodes } from 'src/lib/pages';

export const Codes = (props) => {
  const { sx } = props;
  const location = useLocation();
  const codes = pageItemCodes[location.pathname];
  return (
    <Box component="aside">
      {codes?.map((code) => (
        <Card
          variant="outlined"
          key={code}
          sx={ { ...sx } }
        >
          <Code code={code} />
        </Card>
      ))}
    </Box>
  );
};
