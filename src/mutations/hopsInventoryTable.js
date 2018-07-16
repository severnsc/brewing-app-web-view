import gql from "graphql-tag"

export const UPDATE_HOPS_TABLE_SORT = gql`
	mutation updateHopsInventoryTableSort($cellName: String!) {
		updateHopsInventoryTableSort(cellName: $cellName) @client
	}
`

export const UPDATE_HOPS_TABLE_ITEM_LIMIT = gql`
	mutation updateHopsInventoryTableItemLimit($value: Number!) {
		updateHopsInventoryTableItemLimit(value: $value) @client
	}
`

export const UPDATE_HOPS_TABLE_PAGE_NUMBER = gql`
	mutation updateHopsInventoryTablePageNumber($type: String!) {
		updateHopsInventoryTablePageNumber(type: $type) @client
	}
`

export const UPDATE_HOPS_TABLE_FILTER = gql`
	mutation updateHopsInventoryTableFilter($value: String!) {
		updateHopsInventoryTableFilter(value: $value) @client
	}
`