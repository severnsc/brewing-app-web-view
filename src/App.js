import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './Header'
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import resolvers from './resolvers'
import { ApolloProvider } from "react-apollo"

const uri = "http://localhost:3001/graphql"

const cache = new InMemoryCache()

const defaults = {
  dashboardTableSort: {
    __typename: "DashboardTableSort",
    sortBy: "Item name",
    order: "asc"
  }
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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header isLoggedIn={() => false} />
        <Main />
      </div>
    );
  }
}

const AppWithRouting = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

const AppWithApollo = () => (
  <ApolloProvider client={client}>
    <AppWithRouting />
  </ApolloProvider>
)

export default AppWithApollo;
