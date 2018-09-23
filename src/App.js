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
import ActiveTimerAlertsContainer from "./containers/activeTimerAlertsContainer"
import MaltContainer from "./containers/maltContainer"
import HopsContainer from "./containers/hopsContainer"
import YeastContainer from "./containers/yeastContainer"
import NewOtherContainer from "./containers/newOtherContainer"
import OtherContainer from "./containers/otherContainer"
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

            case "inventoryItem":
              modalItem = <InventoryItemFormContainer id={data.modal.id} />
              break

            case "malt":
              modalItem = <MaltContainer type="update" id={data.modal.id} />
              break

            case "hops":
              modalItem = <HopsContainer type="update" id={data.modal.id} />
              break

            case "yeast":
              modalItem = <YeastContainer type="update" id={data.modal.id} />
              break

            case "misc":
              modalItem = <OtherContainer id={data.modal.id} />
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
              modalItem = <MaltContainer type="create" />
              break

            case "newHops":
              modalItem = <HopsContainer type="create" />
              break

            case "newYeast":
              modalItem = <YeastContainer type="create" />
              break

            case "newOther":
              modalItem = <NewOtherContainer />
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
