import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_GRAPHQL_URI,
});


const getUrl = (src) => {
  console.log(process.env.REACT_APP_CMS_URL);
  return process.env.REACT_APP_CMS_URL + src;
};

export { client, getUrl };
