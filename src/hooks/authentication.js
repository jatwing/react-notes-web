import { gql, useMutation } from '@apollo/client';
import { client } from 'utils/client';

const useAuthentication = (email, password) => {
  const AUTHENTICATE = gql`
    mutation {
      authenticateUserWithPassword(
        email: "${email}"
        password: "${password}"
      ) {
        ... on UserAuthenticationWithPasswordSuccess {
          sessionToken
        }
        ... on UserAuthenticationWithPasswordFailure {
          code
          message
        }
      }
    }
  `;
  return useMutation(AUTHENTICATE, { client: client });
};

export { useAuthentication };
