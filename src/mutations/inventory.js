import gql from "graphql-tag"

export const CREATE_INVENTORY = gql`
	mutation createInventory($name: String!, $userId: String!) {
		createInventory(name: $name, userId: $userId) {
			id
			name
		}
	}
`

export const UPDATE_INVENTORY = gql`
	mutation updateInventory($id: String!, $name: String!) {
		updateInventory(id: $id, name: $name) {
			id
			name
		}
	}
`