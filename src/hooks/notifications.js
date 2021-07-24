import { gql, useQuery } from '@apollo/client';
import { client } from 'utils/client'

/*
 * the code is wrong
 *
 * because here we cannot get the apollo client.
 *
 *
 */

import project from 'config/project';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// if we use Redux, we can dispatch to 3 actions,
// and finally in the component we only need to handle data ????


const useNotifications = () => {
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

  // const { loading, error, data } = useQuery(GET_NOTIFICATIONS)
};

export { useNotifications };
