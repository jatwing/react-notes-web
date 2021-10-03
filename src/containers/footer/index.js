import { Footer as FooterComponent } from 'src/components/layout/footer';
import { JatwingIcon } from 'src/components/data-display/icons';
import { useProjects } from 'src/redux/projects/hooks';
import { List, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Anchor } from 'src/components/navigation/anchor'

export const Footer = () => {
  const projects = useProjects();
  const { t } = useTranslation();

  const contactColumn = projects.isSucceed ? (
    <List>
      <ListItemText primary={t('contact')} />
      <Anchor href={projects.entities[0].email}>
        <ListItemText secondary={t('email')} />
      </Anchor>
      <ListItemText secondary={t('stack_overflow')} />
    </List>
  ) : null;

  const projectColumn = null;

  const columns = ['test1', 'test2', contactColumn];

  return (
    <FooterComponent
      logo={<JatwingIcon />}
      columns={columns}
      copyright={projects.isSucceed ? projects.entities[0].copyright : ''}
    />
  );
};
