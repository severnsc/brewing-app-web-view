import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './containers/common/header'
import ApolloClient from 'apollo-client';
import { Query } from 'react-apollo'
import { isLoggedInQuery } from './queries'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import resolvers from './resolvers'
import { ApolloProvider } from "react-apollo"
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

class App extends Component {
  render() {
    return (
      <Query query={isLoggedInQuery}>
        {({loading, error, data}) => {
          
          let isLoggedIn = false

          if(data.isLoggedIn) isLoggedIn = true

          return(
            <div className="App">
              <Header isLoggedIn={isLoggedIn} />
              <Main />
            </div>
          )
        }}
      </Query>
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
