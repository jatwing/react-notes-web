import { gql, useQuery } from '@apollo/client';
import { client } from 'utils/client';

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
  return useQuery(GET_AUTHOR, { client: client });
};

export { useAuthor };
