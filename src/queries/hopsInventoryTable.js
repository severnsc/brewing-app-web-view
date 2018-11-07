import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query {
		currentUser {
			id
			...InventoryItems
			settings {
				name
				value
			}
		}

		hopsInventoryTable @client {
			sortBy
			sortOrder
			itemsPerPage
			totalPages
			currentPage
			filterString
		}
	}
${currentUserFragments.inventoryItems}
`