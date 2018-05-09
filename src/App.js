import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './Header'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql"
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
