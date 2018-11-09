import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query inventoryTableQuery {
		currentUser {
			id
			...InventoryItems
			settings {
				name
				value
			}
		}

		inventoryTable(name: $name) @client {
			name
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