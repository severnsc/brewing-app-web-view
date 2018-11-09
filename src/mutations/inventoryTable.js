import gql from "graphql-tag"

export const UPDATE_TABLE_SORT = gql`
	mutation updateTableSort($name: String! $sortBy: String!) {
		updateTableSort(name: $name, sortBy: $sortBy) @client 
	}
`