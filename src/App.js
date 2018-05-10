import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './Header'
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from "react-apollo"

const uri = "http://localhost:3001/graphql"

const client = new ApolloClient({
  link: new HttpLink({uri,credentials: "include"}),
  cache: new InMemoryCache()
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
