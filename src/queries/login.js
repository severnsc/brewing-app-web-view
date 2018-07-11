import gql from "graphql-tag"

export default gql`
  query {
    login @client {
      error
    }
  }
`