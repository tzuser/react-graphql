import { ApolloClient } from 'apollo-client';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import ApolloLink from 'apollo-link'
import schema from './schema';
import { onError } from "apollo-link-error";



const getApolloClient=(ctx)=>{
  const staeLient=new SchemaLink({
        schema,
        context: () => ctx
  })
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path ,status}) =>{
        if(path=="self")return false;
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path} Status:${status}`
        )
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const link=errorLink.concat(staeLient)
  const client = new ApolloClient({
    ssrMode: true,
    /*link: new HttpLink({
      uri: 'http://localhost:8181/graphql',
      credentials: 'include',
      headers: {
        cookie: ctx.headers['cookie'],
      },
    }),*/
    link:link,
    cache: new InMemoryCache(),

  });
  return client
}
export default getApolloClient