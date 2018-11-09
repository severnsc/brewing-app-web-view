import gql from "graphql-tag"

export const UPDATE_TABLE_SORT = gql`
	mutation updateTableSort($name: String! $sortBy: String!) {
		updateTableSort(name: $name, sortBy: $sortBy) @client 
	}
`

export const UPDATE_TABLE_ITEMS_PER_PAGE = gql`
	mutation updateTableItemsPerPage($name: String!, $itemsPerPage: Number!) {
		updateTableItemsPerPage(name: $name, itemsPerPage: $itemsPerPage) @client
	}
`