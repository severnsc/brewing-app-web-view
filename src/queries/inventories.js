import gql from "graphql-tag"

export default gql`
	query {
		currentUser {
			id
			inventories {
				id
				name
				items {
					id
				}
			}
		}
	}
`