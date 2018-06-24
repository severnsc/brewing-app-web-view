import gql from 'graphql-tag'
import { currentUserFragments } from "../fragments"

export const dashboardTableQuery = gql`
  query {
    currentUser {
      ...InventoryItems
    }

    dashboard @client {
      sortBy
      sortOrder
      itemLimit
      filterString
      currentPage
    }

  }
  ${currentUserFragments.inventoryItems}
`

export const signupQuery = gql`
  query {
    signup @client {
      isUsernameUnique
      error
    }
  }
`

export const dashboardItemLimitQuery = gql`
  query {
    dashboardItemLimit @client
  }
`

export const topLevelQuery = gql`
  query {
    isLoggedIn @client
    modal @client {
      type
      id
    }
  }
`

export const modalQuery = gql`
  query {
    modal @client {
      type
      id
    }
  }
`

export const loginQuery = gql`
  query {
    login @client {
      error
    }
  }
`

export const profileQuery = gql`
  query {
    currentUser {
      userName
    }
  }
`

export const inventoryItemsQuery = gql`
  query {
    currentUser {
      ...InventoryItems
    }
  }
  ${currentUserFragments.inventoryItems}
`

export const inventoryItemQuery = gql`
  query inventoryItemQuery($id: String!) {
    inventoryItem(id: $id) {
      id
      object
      quantityUnit
      currentQuantity
      reorderQuantity
      reorderThreshold
      costUnit
      unitCost
      reorderCost
      lastReorderDate
      deliveryDate
    }
  }
`