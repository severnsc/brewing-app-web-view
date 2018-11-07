import gql from "graphql-tag"

export const UPDATE_MALT_TABLE_SORT = gql`
	mutation updateMaltInventoryTableSort($cellName: String!) {
		updateMaltInventoryTableSort(cellName: $cellName) @client
	}
`

export const UPDATE_MALT_TABLE_ITEM_LIMIT = gql`
	mutation updateMaltInventoryTableItemLimit($value: Number!) {
		updateMaltInventoryTableItemLimit(value: $value) @client
	}
`

export const UPDATE_MALT_TABLE_PAGE_NUMBER = gql`
	mutation updateMaltInventoryTablePageNumber($type: String!, $page: Number) {
		updateMaltInventoryTablePageNumber(type: $type, number: $number) @client
	}
`

export const UPDATE_MALT_TABLE_FILTER = gql`
	mutation updateMaltInventoryTableFilter($value: String!) {
		updateMaltInventoryTableFilter(value: $value) @client
	}
`