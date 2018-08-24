import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './containers/common/header'
import ModalContainer from "./containers/common/modalContainer"
import InventoryFormContainer from "./containers/inventoryFormContainer"
import InventoryItemFormContainer from "./containers/inventoryItemFormContainer"
import TimerFormContainer from "./containers/timerFormContainer"
import NewTimerFormContainer from "./containers/newTimerFormContainer"
import NewTimerAlertFormContainer from "./containers/newTimerAlertFormContainer"
import { Query } from 'react-apollo'
import { rootQuery } from './queries'
import { ApolloProvider } from "react-apollo"
import client from "./ApolloClient"

class App extends Component {
  render() {
    return (
      <Query query={rootQuery}>
        {({loading, error, data}) => {
          
          let isLoggedIn = false

          if(data.isLoggedIn) isLoggedIn = true
          
          let modalItem
          switch(data.modal.type) {

            case "inventory":
              modalItem = <InventoryFormContainer id={data.modal.id} />
              break

            case "inventoryItem":
              modalItem = <InventoryItemFormContainer id={data.modal.id} />
              break

            case "timer":
              modalItem = <TimerFormContainer id={data.modal.id} />
              break

            case "newTimer":
              modalItem = <NewTimerFormContainer />
              break

            case "newTimerAlert":
              modalItem = <NewTimerAlertFormContainer id={data.modal.id} />
              break

            default:
              modalItem = null

          }

          const modal = data.modal.type !== "" ? <ModalContainer modalItem={modalItem} /> : null
          
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
