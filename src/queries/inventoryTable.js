import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query inventoryTableQuery {
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