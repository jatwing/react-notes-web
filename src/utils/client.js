import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const AUTHENTICATE = gql`
  mutation {
    authenticateUserWithPassword(
      email: "${process.env.REACT_APP_EMAIL}"
      password: "${process.env.REACT_APP_PASSWORD}"
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

const test = client.mutate({ mutation: AUTHENTICATE });

console.log(test);

const getUrl = (src) => {
  console.log(process.env.REACT_APP_CMS_URL);
  return process.env.REACT_APP_CMS_URL + src;
};

export { client, getUrl, test };
