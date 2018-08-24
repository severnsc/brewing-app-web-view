import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, split } from 'apollo-link'
import { getMainDefinition } from 'apollo-utilities';
import { withClientState } from 'apollo-link-state'
import { onError } from "apollo-link-error";
import resolvers from './resolvers'
import defaultState from "./defaultState"
import { WebSocketLink } from 'apollo-link-ws';

const uri = "http://localhost:3001/graphql"

const cache = new InMemoryCache()

const defaults = {
  isLoggedIn: false,
  ...defaultState
}

const stateLink = withClientState({
  cache,
  defaults,
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

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    errorLink,
    link
  ])
})

export default client