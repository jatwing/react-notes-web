import { List, ListItemText, Typography } from '@mui/material';
import { InnerHtml } from 'src/components/data-display/inner-html';
import { ClickableComponentWithDialog } from 'src/components/feedback/dialog';
import { SkeletonText } from 'src/components/feedback/skeleton';
import { Footer as FooterComponent } from 'src/components/layout/footer';
import { Link, linkStyle } from 'src/components/navigation/link';
import { useAuthor } from 'src/redux/author/hooks';
import { useTranslation } from 'src/redux/i18n/hooks';
import { useProject } from 'src/redux/project/hooks';

export const Footer = () => {
  const author = useAuthor();
  const t = useTranslation();
  const project = useProject();
  const authorColumn =
    author.isAvailable && t ? (
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
    ) : (
      <List>
        <ListItemText primary={<SkeletonText variant="primary" />} />
        <ListItemText secondary={<SkeletonText variant="secondary" />} />
        <ListItemText secondary={<SkeletonText variant="secondary" />} />
        <ListItemText secondary={<SkeletonText variant="secondary" />} />
      </List>
    );
  const projectColumn =
    project.isAvailable && t ? (
      <List>
        <ListItemText primary={t('project')} />
        <ClickableComponentWithDialog
          component={
            <ListItemText secondary={t('attribution')} sx={linkStyle} />
          }
          title={t('attribution')}
          content={
            <InnerHtml
              html={project.entity.attribution}
              sx={{
                color: 'text.secondary',
              }}
            />
          }
        />
        <Link href={project.entity.github}>
          <ListItemText secondary={t('github')} />
        </Link>
        <Link href={project.entity.license}>
          <ListItemText secondary={t('license')} />
        </Link>
      </List>
    ) : (
      <List>
        <ListItemText primary={<SkeletonText variant="primary" />} />
        <ListItemText secondary={<SkeletonText variant="secondary" />} />
        <ListItemText secondary={<SkeletonText variant="secondary" />} />
        <ListItemText secondary={<SkeletonText variant="secondary" />} />
      </List>
    );
  const copyright = project.isAvailable ? (
    <Typography>{project.entity.copyright}</Typography>
  ) : (
    <Typography>
      <SkeletonText variant="primary" />
    </Typography>
  );
  return (
    <FooterComponent
      columns={[authorColumn, projectColumn]}
      copyright={copyright}
    />
  );
};
