import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
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