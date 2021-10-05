import { Box } from '@mui/material';
import { Footer } from 'src/containers/footer';
import { Header } from 'src/containers/header';
import { MainContent } from 'src/containers/main-content';
import { NavigationDrawer } from 'src/containers/navigation-drawer';
import { useToggle } from 'src/lib/react';

import {
  AnchorBase,
  AnchorStyle,
  Anchor,
} from 'src/components/navigation/link';

import { Typography } from '@mui/material';
// ??? pros and cons of using typography

export const Page = (props) => {
  const { children } = props;
  const { value: isDrawerOpen, setOn, setOff } = useToggle();
  return (
    <Box sx={{ display: 'flex' }}>
      <NavigationDrawer open={isDrawerOpen} onClose={setOff} />
      <Box
        sx={{
          flexGrow: '1',
          display: 'flex',
          flexFlow: 'column nowrap',
          minHeight: '100vh',
        }}
      >
        <Header setOn={setOn} />
        <MainContent
          children={children}
          sx={{
            flexGrow: '1',
          }}
        />

        {'test 3 link here.'}

        <AnchorBase href="https://developer.mozilla.org/en-US/">
          <Typography>
            {'linkbase , wrong, clear too much style'}
          </Typography>
        </AnchorBase>
        <AnchorStyle>
          <Typography>{'link style'}</Typography>
        </AnchorStyle>

        <Anchor href="https://developer.mozilla.org/en-US/">
          <Typography>{'link '}</Typography>
        </Anchor>

        <Footer />
      </Box>
    </Box>
  );
};
