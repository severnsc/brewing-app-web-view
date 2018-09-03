import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query {
		currentUser {
			...InventoryItems
		}

		yeastInventoryTable @client {
			sortBy
			sortOrder
			itemsPerPage
			currentPage
			filterString
		}
	}
${currentUserFragments.inventoryItems}
`