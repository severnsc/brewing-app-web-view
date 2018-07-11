import gql from "graphql-tag"

export default gql`
  query {
    modal @client {
      type
      id
    }
  }
`