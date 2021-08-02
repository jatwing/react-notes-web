import { gql, useQuery } from '@apollo/client';
import { client } from 'utils/client';

const useReadingNotifications = () => {
  const GET_NOTIFICATIONS = gql`
    query {
      allNotifications {
        name
        isVisible
        order
        content {
          document
        }
      }
    }
  `;
  return useQuery(GET_NOTIFICATIONS, { client: client });
};

export { useReadingNotifications };
