import { useDispatch, useSelector } from 'react-redux';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { selectAllUsers } from '../redux/users/selectors';
import { selectAllNotifications } from '../redux/notifications/selectors';
import { fetchNotifications } from '../redux/notifications/slice';
import { allNotificationsRead } from '../redux/notifications/slice';
import { useEffect } from 'react'


const Notification = (props) => {
  const { notification, users } = props;

  const date = parseISO(notification.date);
  const timeAgo = formatDistanceToNow(date);
  const user = users.find((user) => user.id === notification.user) || {
    name: 'Unknown User',
  };
  /**
   * in single page the notification cannot be clicked, or meaningless
   */
  return (
    <div key={notification.id}>
      <div>
        {notification.isNew && '(new) '}
        <b>{user.name}</b> 
        {notification.message}
      </div>
      <div title={notification.date}>
        <i>{timeAgo} ago</i>
      </div>
    </div>
  );
};

export const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications);
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const handleRefreshClicked = () => {
    dispatch(fetchNotifications());
  };

  useEffect(() => {
    dispatch(allNotificationsRead())
  })


  return (
    <section>
      <h2>{'Notifications'}</h2>
      {notifications?.map((notification) => (
        <Notification notification={notification} users={users} key={notification.id} />
      ))}
      <button onClick={handleRefreshClicked}>{'Refresh Notifications'}</button>
    </section>
  );
};
