import { useState } from 'react';
import { Box } from '@material-ui/core';
import { DocumentRenderer } from '@keystone-next/document-renderer';
import clsx from 'clsx';
import useStyles from './styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { filter, sortBy } from 'lodash';
import { useReadingNotifications } from 'hooks';

import preval from 'preval.macro';

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
  const classes = useStyles();
  if (loading) {
    return (
      <Box className={classes.content}>
        <Box className={classes.row}>{'Loading...'}</Box>
      </Box>
    );
  }
  if (error) {
    return (
      <Box className={classes.content}>
        <ClosableRow>{`Error! ${error.message}`}</ClosableRow>
      </Box>
    );
  }
  const now = preval`
    const date = new Date();
    module.exports = {
      dateString: date.toDateString(),
      timeString: date.toTimeString(),
      date: date
    }
  `;

  console.log(now);
  console.log(typeof now);


  console.log(now.date)
  console.log(typeof now.date)


  const test = preval`
    module.exports = new Date();
  `

console.log(test)

  const notifications = sortBy(
    filter(data.allNotifications, 'isVisible'),
    'order'
  );

  return (
    <Box className={classes.content}>
      {'test'}
      <p>
        Build date : {preval`module.exports = new Date().toLocaleString();`}
      </p>
      {notifications.map((notification) => (
        <ClosableRow key={JSON.stringify(notification)}>
          <DocumentRenderer document={notification.content.document} />
        </ClosableRow>
      ))}
    </Box>
  );
};

export default Banner;
