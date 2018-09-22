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
import NewMaltContainer from "./containers/newMaltContainer"
import MaltContainer from "./containers/maltContainer"
import NewHopsContainer from "./containers/newHopsContainer"
import HopsContainer from "./containers/hopsContainer"
import NewYeastContainer from "./containers/newYeastContainer"
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
              modalItem = <MaltContainer id={data.modal.id} />
              break

            case "hops":
              modalItem = <HopsContainer id={data.modal.id} />
              break

            case "yeast":
              modalItem = <YeastContainer id={data.modal.id} />
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
              modalItem = <NewMaltContainer />
              break

            case "newHops":
              modalItem = <NewHopsContainer />
              break

            case "newYeast":
              modalItem = <NewYeastContainer />
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
