import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

/*
 * the code is wrong 
 *
 * because here we cannot get the apollo client.
 *
 *
 */




// if we use Redux, we can dispatch to 3 actions,
// and finally in the component we only need to handle data ????



const useNotifications = () => {
  const GET_NOTIFICATIONS = gql`
    query {
      allNotifications {
        isVisible
        order
        title
        content
      }
    }
  `;
  return useQuery(GET_NOTIFICATIONS);

  // const { loading, error, data } = useQuery(GET_NOTIFICATIONS)

};

export { useNotifications };
