import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query {
		needsToBeReorderedTable @client {
			sortOrder
			sortBy
			itemLimit
			currentPage
		}

		currentUser {
			id
			...InventoryItems
		}
	}
	${currentUserFragments.inventoryItems}
`