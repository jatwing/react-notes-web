import { gql, useQuery } from '@apollo/client';
import { client } from 'utils/client';
import { useCreatingAuthentication } from 'hooks';
import { useEffect } from 'react';

const useAuthor = (name) => {
  const GET_AUTHOR = gql`
    query {
      Author(where: {name: "${name}"}) {
        name
        avatar {
          src
        }
        email
        stackOverflow
      }
    }
  `;

  const [createAuthentication, { data }] = useCreatingAuthentication(
    process.env.REACT_APP_EMAIL,
    process.env.REACT_APP_PASSWORD
  );

  useEffect(() => {
    createAuthentication();


    console.log(" + " + document.cookie)
  }, []);

  return useQuery(GET_AUTHOR, {
    client: client,
    context: {
      headers: {
        //     Authentication: `Bearer ${token}`
      },
    },
  });
};

export { useAuthor };
