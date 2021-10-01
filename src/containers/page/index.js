import { Box } from '@mui/material';
import { useToggle } from 'src/lib/react';
import { Sidebar } from 'src/containers/sidebar'
import { Header } from 'src/containers/header';

import { CssBaseline} from '@mui/material'

/**
 * opening drawer in mobile will hide scroll bar
 *
 * @see https://codesandbox.io/s/responsivedrawer-material-demo-forked-tt8bl?file=/demo.js
 */


export const Page = () => {

  const { value: isDrawerOpen, setOn, setOff } = useToggle();
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar open={isDrawerOpen} onClose={setOff} />
      <Box sx={{ flexGrow: '1', display: 'flex', flexFlow: 'column nowrap', minHeight: '100vh' }}>
        <Header setOn={setOn}/>
        <div sx={{ flex: '1', padding: '32px' }}>
          <Box sx={{ height: '1000px',  }}>
            {'test'}
          </Box>
        </div>
      </Box>
    </Box>
  );
};
