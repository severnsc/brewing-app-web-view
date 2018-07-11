import gql from "graphql-tag"

export default gql`
  mutation setIsLoggedIn($bool: Boolean) {
    setIsLoggedIn(bool: $bool) @client
  }
`