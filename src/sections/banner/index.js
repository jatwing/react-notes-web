import { useState } from 'react';
import { useNotifications } from 'hooks/notifications';
import { Box } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import { DocumentRenderer } from '@keystone-next/document-renderer';
import clsx from 'clsx';
import useStyles from './styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const GET_NOTIFICATIONS = gql`
  query {
    allNotifications {
      isVisible
      order
      title
      content {
        document
      }
    }
  }
`;

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
  const { loading, error, data } = useQuery(GET_NOTIFICATIONS);

  const classes = useStyles();

  if (loading)
    return (
      <Box className={classes.content}>
        <Box className={classes.row}>{'Loading...'}</Box>
      </Box>
    );
  if (error)
    return (
      <Box className={classes.content}>
        <ClosableRow>{`Error! ${error.message}`}</ClosableRow>
      </Box>
    );
  return (
    <Box className={classes.content}>
      {data.allNotifications.map((notification) => (
        <ClosableRow key={JSON.stringify(notification)}>
          <DocumentRenderer document={notification.content.document} />
        </ClosableRow>
      ))}
    </Box>
  );
};

export default Banner;
