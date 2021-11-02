import { ResponsiveDrawer } from 'src/components/navigation/drawer';
import { Logo } from 'src/containers/logo';
import { usePageContext } from 'src/containers/page';
import { usePages } from 'src/redux/pages/hooks';
import { SkeletonText } from 'src/components/feedback/skeleton';

export const Drawer = () => {
  const { isDrawerOpen, setDrawerClosed } = usePageContext();
  const pages = usePages();
  const skeletonItems = {
    children: [
      {
        type: 'item',
        name: <SkeletonText variant="primary" />,
      },
      {
        type: 'item',
        name: <SkeletonText variant="primary" />,
      },
      {
        type: 'item',
        name: <SkeletonText variant="primary" />,
      },
    ],
  };
  return (
    <ResponsiveDrawer
      open={isDrawerOpen}
      onClose={setDrawerClosed}
      items={!pages.areAvailable ? skeletonItems : pages.entities}
      logo={<Logo variant="colorful" />}
    />
  );
};
