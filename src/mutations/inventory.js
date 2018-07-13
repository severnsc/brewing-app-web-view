import gql from "graphql-tag"

export const UPDATE_INVENTORY = gql`
	mutation updateInventory($id: String!, $name: String!) {
		updateInventory(id: $id, name: $name) {
			id
			name
		}
	}
`