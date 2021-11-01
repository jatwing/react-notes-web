import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { Logo } from 'src/containers/logo';
import { usePageContext } from 'src/containers/page';
import { usePages } from 'src/redux/pages/hooks';

export const NavigationDrawer = () => {
  const { isDrawerOpen, setDrawerClosed } = usePageContext();
  const pages = usePages();

  // the idea is that the data succeed and t ready

  return (
    <ResponsiveDrawer
      open={isDrawerOpen}
      onClose={setDrawerClosed}
      items={pages}
      logo={<Logo variant="colorful" />}
    />
  );
};
