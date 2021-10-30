import { Card } from '@mui/material';
import { Code } from 'src/components/data-display/code';
import {
  React,
  ReactNotes,
  Redux,
  Saga,
} from 'src/components/data-display/icons';
import { useMatchedPage } from 'src/redux/pages/hooks';

const getDisciplineIcon = (discipline) => {
  switch (discipline) {
    case 'react': {
      return React;
    }
    case 'redux': {
      return Redux;
    }
    case 'saga': {
      return Saga;
    }
    default: {
      return ReactNotes;
    }
  }
};

export const Codes = () => {
  const matchedPage = useMatchedPage();
  const codes = matchedPage?.codes;
  const DisciplineIcon = getDisciplineIcon(matchedPage?.discipline);
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
          <DisciplineIcon
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
