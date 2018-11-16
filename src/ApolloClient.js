import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { onError } from "apollo-link-error";
import resolvers from './resolvers'
import defaultState from "./defaultState"

const uri = "https://brewing-app-api.herokuapp.com/graphql"

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers
})

const httpLink = new HttpLink({uri,credentials: "include"})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    errorLink,
    httpLink
  ])
})

client.onResetStore(stateLink.writeDefaults);

export default client