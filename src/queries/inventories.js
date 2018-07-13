import gql from "graphql-tag"

export default gql`
	query {
		currentUser {
			inventories {
				id
				name
			}
		}
	}
`