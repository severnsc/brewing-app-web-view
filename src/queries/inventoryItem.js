import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

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
      inventory {
        id
      }
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