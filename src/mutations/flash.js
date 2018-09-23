import gql from "graphql-tag"

export default gql`
	mutation updateFlash($message: String!) {
		updateFlash(message: $message) @client
	}
`