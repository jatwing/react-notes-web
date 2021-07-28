import { gql, useQuery, useMutation } from '@apollo/client';
import { client } from 'utils/client';

const useAuthentication = () => {
  const GET_AUTHENTICATION = gql`
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
  return useQuery(GET_AUTHENTICATION, { client: client });
};

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

export { useAuthentication, useCreatingAuthentication };
