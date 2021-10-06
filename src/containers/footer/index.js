import { List, ListItemText} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { JatwingIcon } from 'src/components/data-display/icons';
import { Footer as FooterComponent } from 'src/components/layout/footer';
import { useAuthor } from 'src/redux/authors/hooks';
import { useProject } from 'src/redux/projects/hooks';

import { Link, linkStyle } from 'src/components/navigation/link';


export const Footer = () => {
  const project = useProject();
  const author = useAuthor();
  const { t } = useTranslation();

  // TODO
  // 1. the style is bad :<, edit the css
  // 2. the translations except for entity key,
  //    should use snake case such as  "happy_bird"
  // 3. that means pages filename should be escaped.
  // 4. the attribution popup
  const authorColumn = author.isSucceed ? (
    <List>
      <ListItemText primary={t('author')} />
      <Link href={author.entity.email}>
        <ListItemText secondary={t('email')} />
      </Link>
      <Link href={author.entity.stackOverflow}>
        <ListItemText secondary={t('stack_overflow')} />
      </Link>
      <Link href={author.entity.twitter}>
        <ListItemText secondary={t('twitter')} />
      </Link>
    </List>
  ) : null;
  const projectColumn = project.isSucceed ? (
    <List>
      <ListItemText primary={t('project')} />

      <Link href="#" underline="hover">
        <ListItemText secondary={t('attribution')} />
      </Link>

      <Link href={project.entity.github}>
        <ListItemText secondary={t('github')} />
      </Link>
      <Link href={project.entity.license}>
        <ListItemText secondary={t('license')} />
      </Link>
    </List>
  ) : null;

  return (
    <FooterComponent
      columns={[authorColumn, projectColumn]}
      copyright={project.isSucceed ? project.entity.copyright : ''}
    />
  );
};
