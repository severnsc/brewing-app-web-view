import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './containers/common/header'
import ModalContainer from "./containers/common/modalContainer"
import { Query } from 'react-apollo'
import { topLevelQuery, inventoryItemsQuery } from './queries'
import { ApolloProvider } from "react-apollo"
import client from "./ApolloClient"

class App extends Component {
  render() {
    return (
      <Query query={topLevelQuery}>
        {({loading, error, data, client}) => {
          
          let isLoggedIn = false

          if(data.isLoggedIn) isLoggedIn = true
          
          let modalItem
          switch(data.modal.type) {

            case "inventoryItem":
              const { currentUser } = client.readQuery({ query: inventoryItemsQuery })
              modalItem = currentUser.inventories[0].items.find(item => item.id === data.modal.id)
              break

            default:
              modalItem = null

          }

          const modal = data.modal.type !== "" ? <ModalContainer modalItem={JSON.stringify(modalItem)} /> : null
          
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
