import { DocumentRenderer } from '@keystone-next/document-renderer';
import { Box } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import clsx from 'clsx';
import { filter, sortBy } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReadingNotifications } from 'src/hooks';
import { buildDate } from 'src/utils';

import { useStyles } from './styles';

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

const Banner = () => <></>;

const Banner2 = () => {
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
