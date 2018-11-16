import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
  query {
    currentUser {
    	id
    	settings {
				name
				value
			}
      ...InventoryItems
    }
  }
  ${currentUserFragments.inventoryItems}
`