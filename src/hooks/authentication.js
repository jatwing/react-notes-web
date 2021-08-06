import { gql, useMutation, useQuery } from '@apollo/client';
import { client } from 'utils';

const useCreatingAuthentication = (email, password) => {
  const CREATE_AUTHENTICATION = gql`
    mutation {
      authenticateUserWithPassword(
        email: "${email}"
        password: "${password}"
      ) {
        ... on UserAuthenticationWithPasswordSuccess {
          sessionToken 
          item {
            id
            name
            email
            password {
              isSet
            }
          }
        }
        ... on UserAuthenticationWithPasswordFailure {
          code
          message
        }
      }
    }
  `;
  return useMutation(CREATE_AUTHENTICATION, { client: client });
};

const useReadingAuthentication = () => {
  const READ_AUTHENTICATION = gql`
    query {
      authenticatedItem {
        ... on User {
          id
          name
          email
          password {
            isSet
          }
        }
      }
    }
  `;
  return useQuery(READ_AUTHENTICATION, { client: client });
};

export { useCreatingAuthentication, useReadingAuthentication };
