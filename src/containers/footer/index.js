import { List, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { JatwingIcon } from 'src/components/data-display/icons';
import { Footer as FooterComponent } from 'src/components/layout/footer';
import { Anchor } from 'src/components/navigation/anchor';
import { useAuthor } from 'src/redux/authors/hooks';
import { useProject } from 'src/redux/projects/hooks';

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
      <Anchor href={author.entity.email}>
        <ListItemText secondary={t('email')} />
      </Anchor>
      <Anchor href={author.entity.stackOverflow}>
        <ListItemText secondary={t('stack_overflow')} />
      </Anchor>
      <Anchor href={author.entity.twitter}>
        <ListItemText secondary={t('twitter')} />
      </Anchor>
    </List>
  ) : null;
  const projectColumn = project.isSucceed ? (
    <List>
      <ListItemText primary={t('project')} />
      <Anchor href={project.entity.github}>
        <ListItemText secondary={t('attribution')} />
      </Anchor>
      <Anchor href={project.entity.github}>
        <ListItemText secondary={t('github')} />
      </Anchor>
      <Anchor href={project.entity.license}>
        <ListItemText secondary={t('license')} />
      </Anchor>
    </List>
  ) : null;

  return (
    <FooterComponent
      logo={<JatwingIcon />}
      columns={[authorColumn, projectColumn]}
      copyright={project.isSucceed ? project.entity.copyright : ''}
    />
  );
};
