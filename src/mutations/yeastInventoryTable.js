import gql from "graphql-tag"

export const UPDATE_YEAST_TABLE_SORT = gql`
	mutation updateYeastInventoryTableSort($cellName: String!) {
		updateYeastInventoryTableSort(cellName: $cellName) @client
	}
`

export const UPDATE_YEAST_TABLE_ITEM_LIMIT = gql`
	mutation updateYeastInventoryTableItemLimit($value: Number!) {
		updateYeastInventoryTableItemLimit(value: $value) @client
	}
`

export const UPDATE_YEAST_TABLE_PAGE_NUMBER = gql`
	mutation updateYeastInventoryTablePageNumber($type: String!) {
		updateYeastInventoryTablePageNumber(type: $type) @client
	}
`

export const UPDATE_YEAST_TABLE_FILTER = gql`
	mutation updateYeastInventoryTableFilter($value: String!) {
		updateYeastInventoryTableFilter(value: $value) @client
	}
`