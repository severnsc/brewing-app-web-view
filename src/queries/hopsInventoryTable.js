import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query {
		currentUser {
			id
			...InventoryItems
		}

		hopsInventoryTable @client {
			sortBy
			sortOrder
			itemsPerPage
			currentPage
			filterString
		}
	}
${currentUserFragments.inventoryItems}
`