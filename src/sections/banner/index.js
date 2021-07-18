import { useNotifications } from 'hooks/notifications';
import { Box } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

const Notifications = () => {
  //  const { loading, error, data } = useNotifications();

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

  const { loading, error, data } = useQuery(GET_NOTIFICATIONS);

  if (loading) return <Box>{'Loading...'}</Box>;
  if (error) return <Box>{`Error! ${error.message}`}</Box>;

  /*
   * now, we cannot get the HTML string.
   */

  /*
   * can we return the HTML here ?
   *
   */


  return <>
    {
      data.allNotifications.map(notification => 
        <Box>
        {notification.content.document[0].children[0].text}
        </Box>
      )

    }
  </>;
};

const Banner = () => {
  return (
    <div>
      <Notifications />
    </div>
  );
};

export default Banner;
