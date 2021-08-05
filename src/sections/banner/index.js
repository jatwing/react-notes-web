import { useState } from 'react';
import { Box } from '@material-ui/core';
import { DocumentRenderer } from '@keystone-next/document-renderer';
import clsx from 'clsx';
import { useStyles } from './styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { filter, sortBy } from 'lodash';
import { useReadingNotifications } from 'hooks';
import { buildDate } from 'utils';
import { useTranslation } from 'react-i18next';

const ClosableRow = (props) => {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(false);
  };

  const classes = useStyles();
  return (
    <Box className={clsx(classes.row, !isOpen && classes.hidden)}>
      {children}
      <HighlightOffIcon onClick={handleClick} className={classes.icon} />
    </Box>
  );
};

const Banner = () => {
  const { loading, error, data } = useReadingNotifications();

  const { t } = useTranslation();
  const classes = useStyles();
  if (loading) {
    return (
      <Box className={classes.content}>
        <Box className={classes.row}>{t('loading')}</Box>
      </Box>
    );
  }
  if (error) {
    return (
      <Box className={classes.content}>
        <ClosableRow>{`${t('error')} ${error.message}`}</ClosableRow>
      </Box>
    );
  }

  const { date, time } = buildDate;
  const isDevelopmentMode = process.env.NODE_ENV === 'development';
  const notifications = sortBy(
    filter(data.allNotifications, 'isVisible'),
    'order'
  );

  return (
    <Box className={classes.content}>
      {isDevelopmentMode && (
        <ClosableRow key={'development build date'}>
          <p>{t('developmentBuildAtTimeOnDate', { time, date })}</p>
        </ClosableRow>
      )}
      {notifications.map((notification) => (
        <ClosableRow key={JSON.stringify(notification)}>
          <DocumentRenderer document={notification.content.document} />
        </ClosableRow>
      ))}
    </Box>
  );
};

export { Banner };
