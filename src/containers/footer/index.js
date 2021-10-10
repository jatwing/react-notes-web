import { List, ListItemText, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Footer as FooterComponent } from 'src/components/layout/footer';
import { useAuthor } from 'src/redux/authors/hooks';
import { useProject } from 'src/redux/projects/hooks';
import { Link, linkStyle } from 'src/components/navigation/link';
import { useLocalization } from 'src/redux/i18n/hooks';
import { ClickableComponentWithDialog } from 'src/components/feedback/dialog';

export const Footer = () => {
  const project = useProject();
  const author = useAuthor();
  const { t } = useTranslation();
  const l = useLocalization();
  const authorColumn = author.isSucceed ? (
    <List>
      <ListItemText primary={t('author')} />
      <Link href={author.entity.email}>
        <ListItemText secondary={t('email')} />
      </Link>
      <Link href={author.entity.slack}>
        <ListItemText secondary={t('slack')} />
      </Link>
      <Link href={author.entity.stackOverflow}>
        <ListItemText secondary={t('stack_overflow')} />
      </Link>
    </List>
  ) : null;

  console.log(project)
  const projectColumn = project.isSucceed ? (
    <List>
      <ListItemText primary={t('project')} />
      <ClickableComponentWithDialog
        component={<ListItemText secondary={t('attribution')} sx={linkStyle}/>}
        title={t('attribution')}
        content={<Box dangerouslySetInnerHTML={{ __html : project.entity.attribution  }}    />}
      />
      <Link href={project.entity.github}>
        <ListItemText secondary={t('github')} />
      </Link>
      <Link href={project.entity.license}>
        <ListItemText secondary={t('license')} />
      </Link>
    </List>
  ) : null;
  const copyright = project.isSucceed ? (
    <Typography>{l(project.entity.copyright)}</Typography>
  ) : (
    ''
  );
  return (
    <FooterComponent
      columns={[authorColumn, projectColumn]}
      copyright={copyright}
    />
  );
};
