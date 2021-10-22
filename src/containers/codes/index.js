import { Box, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Code } from 'src/components/data-display/code';
import { pageItemCodes } from 'src/lib/pages';

export const Codes = (props) => {
  const location = useLocation();
  const codes = pageItemCodes[location.pathname];
  return (
    <>
      {codes?.map((code) => (
        <Card component="aside" variant="outlined" key={code}>
          <Code code={code} />
        </Card>
      ))}
    </>
  );
};
