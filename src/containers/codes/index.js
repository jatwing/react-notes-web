import { Card } from '@mui/material';
import { Code } from 'src/components/data-display/code';
import { useMatchedPage } from 'src/redux/pages/hooks';

export const Codes = () => {
  const matchedPages = useMatchedPage();
  const codes = matchedPages?.codes;
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
