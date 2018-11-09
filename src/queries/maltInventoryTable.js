import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query {
		maltInventoryTable @client {
			sortOrder
			sortBy
			itemsPerPage
			currentPage
			filterString
		}

		currentUser {
			id
			settings {
				id
				name
				value
			}
			...InventoryItems
		}
	}
	${currentUserFragments.inventoryItems}
`