import gql from 'graphql-tag'
import dashboardTableQuery from "./dashboard"
import timersTableQuery from "./timersTable"
import signupQuery from "./signup"
import modalQuery from "./modal"
import loginQuery from "./login"
import profileQuery from "./profile"
import inventoryItemsQuery from "./inventoryItem"
import timersQuery from "./timer"
import activeTimerQuery from "./activeTimer"
import inventoriesTableQuery from "./inventoriesTable"
import inventoriesQuery from "./inventories"

const rootQuery = gql`
  query {
    isLoggedIn @client
    modal @client {
      type
      id
    }
  }
`

export {
  dashboardTableQuery,
  timersTableQuery,
  signupQuery,
  modalQuery,
  loginQuery,
  profileQuery,
  inventoryItemsQuery,
  timersQuery,
  activeTimerQuery,
  inventoriesTableQuery,
  inventoriesQuery,
  rootQuery
}