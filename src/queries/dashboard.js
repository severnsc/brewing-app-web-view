import gql from "graphql-tag"
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

export const dashboardItemLimitQuery = gql`
  query {
    dashboardItemLimit @client
  }
`