import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import resolvers from './resolvers'
import defaultState from "./defaultState"

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

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    httpLink
  ])
})

export default client