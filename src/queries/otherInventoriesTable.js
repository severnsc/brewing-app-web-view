import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query {
		currentUser {
			...InventoryItems
		}

		otherInventoriesTable @client {
			sortBy
			sortOrder
			itemsPerPage
			currentPage
			filterString
		}
	}
${currentUserFragments.inventoryItems}
`