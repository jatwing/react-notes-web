import { JatwingIcon } from 'src/components/data-display/icons';
import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { useLocalization } from 'src/redux/i18n/hooks';
import { usePages } from 'src/redux/pages/hooks';
import { useProjects } from 'src/redux/projects/hooks';

export const Sidebar = (props) => {
  const { open, onClose } = props;
  const pages = usePages();
  const projects = useProjects();
  const l = useLocalization();
  return (
    <ResponsiveDrawer
      open={open}
      onClose={onClose}
      items={pages}
      logo={JatwingIcon}
      title={l(projects?.entities?.[0]?.title)}
    />
  );
};
