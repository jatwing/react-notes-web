import { ResponsiveDrawer } from 'src/components/navigation/responsive-drawer';
import { JatwingIcon } from 'src/components/data-display/icons';
import { useProjects } from 'src/redux/projects/hooks';
import { usePages } from 'src/redux/pages/hooks';
import { useLocalization } from 'src/utils/i18next';

export const Drawer = (props) => {
  const { open, onClose } = props;
  const pages = usePages();
  const projects = useProjects();
  const l = useLocalization();
  return (
    <ResponsiveDrawer
      open={open}
      onClose={onClose}
      items={pages}
      Logo={JatwingIcon}
      title={l(projects?.entities?.[0]?.title)}
    />
  );
};

