import gql from "graphql-tag"

export const UPDATE_INVENTORIES_TABLE_SORT = gql`
	mutation updateInventoriesTableSort($cellName: String!) {
		updateInventoriesTableSort(cellName: $cellName) @client
	}
`
export const UPDATE_INVENTORIES_TABLE_ITEM_LIMIT = gql`
	mutation updateInventoriesTableItemLimit($value: Number!) {
		updateInventoriesTableItemLimit(value: $value) @client
	}
`
export const UPDATE_INVENTORIES_TABLE_PAGE_NUMBER = gql`
	mutation updateInventoriesTablePageNumber($type: String!) {
		updateInventoriesTablePageNumber(type: $type) @client
	}
`