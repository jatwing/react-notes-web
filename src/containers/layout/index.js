import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { useTranslation } from 'react-i18next';
import { JatwingIcon } from 'src/components/data-display/icons';
import { useProjects } from 'src/redux/projects/hooks';
import { usePages } from 'src/redux/pages/hooks';
import { useLocalization } from 'src/utils/i18next';
import { useToggle } from 'src/utils/react';
import { Drawer  } from 'src/containers/drawer';


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

export const Layout = () => {
  const pages = usePages();
  const { value : isDrawerOpen, setOn, setOff   }   = useToggle();
  const projects = useProjects();
  const l = useLocalization();


  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.containerTwo}>
        <Drawer 
          open={isDrawerOpen}
          onClose={setOff}
        />

        <Box>
          <div>
            <Button onClick={setOn}>{'test button'}</Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
