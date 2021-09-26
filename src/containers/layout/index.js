import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { useToggle } from 'src/utils/react';
import { useTranslation } from 'react-i18next';
import { JatwingIcon } from 'src/components/data-display/icons';
import { useProjects } from 'src/redux/projects/hooks';
import { usePages } from 'src/redux/pages/hooks';
import { useLocalization } from 'src/utils/i18next';

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
  useLocalization();

  const pages = usePages();
  const [isOpen, setIsOpen] = useToggle();
  const projects = useProjects();
  const l = useLocalization();

  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.containerTwo}>
        <ResponsiveDrawer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          items={pages}
          Logo={JatwingIcon}
          title={l(projects?.entities?.[0]?.title)}
        />
        <Box>
          <div>{'app bar content and footer'}</div>
          <div>
            <Button onClick={() => setIsOpen(true)}>{'test button'}</Button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};
