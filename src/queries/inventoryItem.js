import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
  query {
    currentUser {
      ...InventoryItems
    }
  }
  ${currentUserFragments.inventoryItems}
`