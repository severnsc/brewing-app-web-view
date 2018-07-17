import gql from "graphql-tag"

export const UPDATE_OTHER_INVENTORIES_TABLE_SORT = gql`
	mutation updateOtherInventoriesTableSort($cellName: String!) {
		updateOtherInventoriesTableSort(cellName: $cellName) @client
	}
`

export const UPDATE_OTHER_INVENTORIES_TABLE_ITEM_LIMIT = gql`
	mutation updateOtherInventoriesTableItemLimit($value: Number!) {
		updateOtherInventoriesTableItemLimit(value: $value) @client
	}
`

export const UPDATE_OTHER_INVENTORIES_TABLE_PAGE_NUMBER = gql`
	mutation updateOtherInventoriesTablePageNumber($type: String!) {
		updateOtherInventoriesTablePageNumber(type: $type) @client
	}
`

export const UPDATE_OTHER_INVENTORIES_TABLE_FILTER = gql`
	mutation updateOtherInventoriesTableFilter($value: String!) {
		updateOtherInventoriesTableFilter(value: $value) @client
	}
`