import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
	query {
		maltInventoryTable @client {
			sortOrder
			sortBy
			itemLimit
			currentPage
			filterString
		}

		currentUser {
			...InventoryItems
		}
	}
	${currentUserFragments.inventoryItems}
`