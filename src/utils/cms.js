import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_CMS_GRAPHQL_URI,
});

const getAssetUrl = (src) => {
  return process.env.REACT_APP_CMS_URL + src;
};

export { client, getAssetUrl };
