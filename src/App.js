import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './containers/common/header'
import ModalContainer from "./containers/common/modalContainer"
import InventoryFormContainer from "./containers/inventoryFormContainer"
import TimerFormContainer from "./containers/timerFormContainer"
import NewTimerFormContainer from "./containers/newTimerFormContainer"
import NewTimerAlertFormContainer from "./containers/newTimerAlertFormContainer"
import ActiveTimerAlertsContainer from "./containers/activeTimerAlertsContainer"
import InventoryItemContainer from "./containers/inventoryItemContainer"
import { Query } from 'react-apollo'
import { modalQuery } from './queries'
import { ApolloProvider } from "react-apollo"
import client from "./ApolloClient"

class App extends Component {
  render() {
    return (
      <Query query={modalQuery}>
        {({loading, error, data}) => {
          
          let modalItem
          switch(data.modal.type) {

            case "inventory":
              modalItem = <InventoryFormContainer id={data.modal.id} />
              break

            case "malt":
              modalItem = <InventoryItemContainer type="update" id={data.modal.id} inventoryType="Malt" />
              break

            case "hops":
              modalItem = <InventoryItemContainer type="update" id={data.modal.id} inventoryType="Hops" />
              break

            case "yeast":
              modalItem = <InventoryItemContainer type="update" id={data.modal.id} inventoryType="Yeast" />
              break

            case "misc":
              modalItem = <InventoryItemContainer type="update" id={data.modal.id} inventoryType="Other" />
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

            case "newMalt":
              modalItem = <InventoryItemContainer type="create" inventoryType="Malt" />
              break

            case "newHops":
              modalItem = <InventoryItemContainer type="create" inventoryType="Hops" />
              break

            case "newYeast":
              modalItem = <InventoryItemContainer type="create" inventoryType="Yeast" />
              break

            case "newOther":
              modalItem = <InventoryItemContainer type="create" inventoryType="Other" />
              break

            case "activeTimerAlerts":
              modalItem = <ActiveTimerAlertsContainer id={data.modal.id} />
              break

            default:
              modalItem = null

          }

          const modal = data.modal.type !== "" ? <ModalContainer modalItem={modalItem} /> : null
          
          return(
            <div className="App">
              <Header />
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
