import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { Logo } from 'src/containers/logo';
import { usePageContext } from 'src/containers/page';
import { usePages } from 'src/redux/pages/hooks';
import { useProject } from 'src/redux/project/hooks';

export const NavigationDrawer = () => {
  const { isDrawerOpen, setDrawerClosed } = usePageContext();
  const pages = usePages();
  const project = useProject();
  return (
    <ResponsiveDrawer
      open={isDrawerOpen}
      onClose={setDrawerClosed}
      items={pages}
      logo={<Logo variant="colorful" />}
    />
  );
};
