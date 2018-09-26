import gql from "graphql-tag"

export const UPDATE_NEEDS_TO_BE_REORDERED_TABLE_SORT = gql`
	mutation updateNeedsToBeReorderedTableSort($cellName: String!) {
		updateNeedsToBeReorderedTableSort(cellName: $cellName) @client
	}
`

export const UPDATE_NEEDS_TO_BE_REORDERED_TABLE_ITEM_LIMIT = gql`
	mutation updateNeedsToBeReorderedTableItemLimit($value: Number!) {
		updateNeedsToBeReorderedTableItemLimit(value: $value) @client
	}
`

export const UPDATE_NEEDS_TO_BE_REORDERED_TABLE_PAGE_NUMBER = gql`
	mutation updateNeedsToBeReorderedTablePageNumber($type: String!) {
		updateNeedsToBeReorderedTablePageNumber(type: $type) @client
	}
`