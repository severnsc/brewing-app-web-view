import gql from "graphql-tag"

export default gql`
  query {
    signup @client {
      isUsernameUnique
      error
    }
  }
`