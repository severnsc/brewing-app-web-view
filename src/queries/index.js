import gql from 'graphql-tag'

import {
  dashboardTableQuery,
  dashboardItemLimitQuery
} from "./dashboard"

import timersTableQuery from "./timersTable"

import signupQuery from "./signup"

import modalQuery from "./modal"

import loginQuery from "./login"

import profileQuery from "./profile"

import {
  inventoryItemQuery,
  inventoryItemsQuery
} from "./inventoryItem"

import timersQuery from "./timer"

import activeTimerQuery from "./activeTimer"

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
  dashboardItemLimitQuery,
  timersTableQuery,
  signupQuery,
  modalQuery,
  loginQuery,
  profileQuery,
  inventoryItemQuery,
  inventoryItemsQuery,
  timersQuery,
  activeTimerQuery,
  rootQuery
}