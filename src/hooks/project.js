import { gql, useQuery } from '@apollo/client';
import { client } from 'utils';

const useReadingProject = (name) => {
  const GET_PROJECT = gql`
    query {
      Project(where: {name: "${name}"}) {
        name
        attribution {
          document
        }
        avatar {
          src
        }
        copyright
        github
        license
        title
      }
    }
  `;
  return useQuery(GET_PROJECT, { client: client });
};

export { useReadingProject };
