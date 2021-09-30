import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { JatwingIcon } from 'src/components/data-display/icons';
import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { Drawer } from 'src/containers/drawer';
import { usePages } from 'src/redux/pages/hooks';
import { useProjects } from 'src/redux/projects/hooks';
import { useLocalization } from 'src/redux/i18n/hooks';
import { useToggle } from 'src/lib/react';

import { Header} from 'src/containers/header'

const useStyles = makeStyles((theme) => {
  return {
    /** block */
    content: {
      flex: '1',
      padding: '32px',
    },
    /** container  */
    container: {
      display: 'flex',
      flexFlow: 'column nowrap',
      minHeight: '100vh',
    },
    containerTwo: {
      display: 'flex',
    },
  };
});

export const Page  = () => {
  const { value: isDrawerOpen, setOn, setOff } = useToggle();
  const projects = useProjects();
  const l = useLocalization();
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.containerTwo}>
        <Drawer open={isDrawerOpen} onClose={setOff} />

        <Header />

        <Box>
          <div>
            <Button onClick={setOn}>{'test button'}</Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
