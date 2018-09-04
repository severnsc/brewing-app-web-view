import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
  query {
    currentUser {
      id
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