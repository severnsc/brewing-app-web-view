import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './Header'
import ApolloClient from 'apollo-client';
import Modal from "./components/modal"
import PropertySelectorThingy from "./components/propertySelectorThingy"
import { Query } from 'react-apollo'
import { topLevelQuery } from './queries'
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
  },
  dashboardTableFilterString: "",
  dashboardItemLimit: 25,
  dashboardTableCurrentPage: 0,
  modalItem: {
    __typename: "ModalItem",
    type: "",
    itemId: ""
  },
  isLoggedIn: false
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
      <Query query={topLevelQuery}>
        {({loading, error, data}) => {
          
          let isLoggedIn = false

          if(data.isLoggedIn) isLoggedIn = true

          const modal = data.modalItem.type !== "" ? (
            <Modal>
              {data.modalItem.itemId}
            </Modal>
          ) : null

          return(
            <div className="App">
              <Header isLoggedIn={isLoggedIn} />
              <Main />
              {modal}
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
