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
        copyright
        github
        license
      }
    }
  `;
  return useQuery(GET_PROJECT, { client: client });
};

export { useReadingProject };
