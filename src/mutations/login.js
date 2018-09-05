import gql from "graphql-tag"

export default gql`
  mutation updateLogin($error: String!) {
  	updateLogin(error: $error) @client {
  		error
  	}
  }
`