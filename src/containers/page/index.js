import { Box } from '@mui/material';
import { Footer } from 'src/containers/footer';
import { Header } from 'src/containers/header';
import { MainContent } from 'src/containers/main-content';
import { NavigationDrawer } from 'src/containers/navigation-drawer';
import { useToggle } from 'src/lib/react';

import { LinkBase, LinkStyle, Link } from 'src/components/navigation/link'


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

    { 'test 3 link here.'}

      <LinkBase>{'linkbase'}</LinkBase>
      <LinkStyle>{'link style'}</LinkStyle>

      <Link>{'link function and style'}</Link>



        <Footer />
      </Box>
    </Box>
  );
};
