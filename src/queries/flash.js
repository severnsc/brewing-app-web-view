import gql from "graphql-tag"

export default gql`
	query {
		flash @client {
			message
		}
	}
`