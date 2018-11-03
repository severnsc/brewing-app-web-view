import gql from "graphql-tag"

export default gql`
	query {
		currentUser {
			id
			settings {
				id
				name
				value
			}
		}
	}
`