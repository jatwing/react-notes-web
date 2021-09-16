import { Box } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import clsx from 'clsx';
import { filter, sortBy } from 'lodash';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotifications } from 'src/redux/notifications/hooks';
import { buildDate } from 'src/utils/preval';

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

export const Banner = () => {
  const notifications = useNotifications();

  const { t } = useTranslation();
  const classes = useStyles();
  if (!notifications.isSucceed) {
    return (
      <Box className={classes.content}>
        <Box className={classes.row}>{t('loading')}</Box>
      </Box>
    );
  }

  const { date, time } = buildDate;
  const isDevelopmentMode = process.env.NODE_ENV === 'development';

  return (
    <Box className={classes.content}>
      {isDevelopmentMode && (
        <ClosableRow key={'development build date'}>
          <p>{t('developmentBuildAtTimeOnDate', { time, date })}</p>
        </ClosableRow>
      )}
      {notifications.entities.map((notification) => (
        <ClosableRow key={JSON.stringify(notification)}>
          <p dangerouslySetInnerHTML={{ __html: notification.content }}></p>
        </ClosableRow>
      ))}
    </Box>
  );
};
