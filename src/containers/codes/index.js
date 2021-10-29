import { Card  } from '@mui/material';
import { Code } from 'src/components/data-display/code';
import { useMatchedPage } from 'src/redux/pages/hooks';

import { ReactNotes  } from 'src/components/data-display/icons';

export const Codes = () => {
  const matchedPage = useMatchedPage();
  const codes = matchedPage?.codes;
  let Icon = null;
  console.log(matchedPage)

  // page.discipline.
  //
  // display when larger than md
  //
  Icon = ReactNotes;


  return (
    <>
      {codes?.map((code) => (
        <Card
          component="aside"
          variant="outlined"
          key={code}
          sx={{
            position: 'relative',
            '&:hover .MuiSvgIcon-root, &:focus .MuiSvgIcon-root': {
              color: 'text.secondary',
            },
          }}
        >
          <Icon
            sx={{
              width: '48px',
              height: '48px',
              color: 'text.disabled',
              position: 'absolute',
              right: '24px',
              top: '24px',
            }}
          />
          <Code code={code} />
        </Card>
      ))}
    </>
  );
};
