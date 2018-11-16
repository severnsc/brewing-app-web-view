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

export const UPDATE_TABLE_PAGE_NUMBER = gql`
	mutation updateTablePageNumber($name: String!, $type: String!, $pageNumber: Number) {
		updateTablePageNumber(name: $name, type: $type, pageNumber: $pageNumber) @client
	}
`

export const UPDATE_TABLE_FILTER = gql`
	mutation updateTableFilter($name: String!, $filterString: String!) {
		updateTableFilter(name: $name, filterString: $filterString) @client
	}
`