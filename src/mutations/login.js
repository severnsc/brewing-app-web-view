import gql from "graphql-tag"

export default gql`
  mutation loginUser($username: String!, $password: String!) {
  	authenticateUser(username: $username, password: $password) {
  		id
  	}
  }
`