import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { Logo } from 'src/containers/logo';
import { usePageContext } from 'src/containers/page-container';
import { useLocalization } from 'src/redux/i18n/hooks';
import { usePages } from 'src/redux/pages/hooks';
import { useProjects } from 'src/redux/projects/hooks';

export const NavigationDrawer = () => {
  const { isDrawerOpen, setDrawerClosed } = usePageContext();
  const pages = usePages();
  const projects = useProjects();
  const l = useLocalization();
  return (
    <ResponsiveDrawer
      open={isDrawerOpen}
      onClose={setDrawerClosed}
      items={pages}
      logo={<Logo variant="colorful" />}
      title={projects?.entities?.[0]?.title}
    />
  );
};
