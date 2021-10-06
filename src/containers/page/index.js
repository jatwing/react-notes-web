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
  anchorStyle
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

    <Box>
      <Typography sx={{ color : 'red' }}>
        {'vs  anchor base'}
      </Typography>
    </Box>


        <AnchorBase href="https://developer.mozilla.org/en-US/">
          <Typography sx={{ color: 'red'  }}>
            {'linkbase , wrong, clear too much style'}
          </Typography>
        </AnchorBase>

<Box sx={{ height: '100px'  }}/>



      <Typography sx={{  }}>
        {'vs  anchor style, e.g. text open dialog'}
      </Typography>


      <Box sx={anchorStyle}>
        <Typography sx={{  }}>
          {'not create directly'}
        </Typography>
      </Box>

          <Typography sx={{ ...anchorStyle  , color: 'purple' }}>{'link style span'}</Typography>





        <Anchor href="https://developer.mozilla.org/en-US/">
          <Typography>{'link '}</Typography>
        </Anchor>

        <Footer />
      </Box>
    </Box>
  );
};
