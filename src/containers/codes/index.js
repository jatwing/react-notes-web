import { Card } from '@mui/material';
import { Code } from 'src/components/data-display/code';
import { useMatchedPage } from 'src/redux/pages/hooks';
import { ReactNotes, React, Redux, Saga } from 'src/components/data-display/icons';

export const Codes = () => {
  const matchedPage = useMatchedPage();
  const codes = matchedPage?.codes;

  let Icon = null;
  console.log(matchedPage);

  // page.discipline.
  //
  // display when larger than md
  //

  Icon = Saga;

  // switch
  if (matchedPage?.discipline) {
  //  Icon = Redux;
  }

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
              opacity: '0',
            },
          }}
        >
          <Icon
            sx={{
              width: '48px',
              height: '48px',
              color: 'action.focus',
              position: 'absolute',
              right: '16px',
              top: '16px',
              transition: (theme) => theme.transitions.create('opacity'),
            }}
          />
          <Code code={code} />
        </Card>
      ))}
    </>
  );
};
