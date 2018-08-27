import gql from "graphql-tag"

export default gql`
  mutation updateActiveTimer($id: String!) {
    updateActiveTimer(id: $id) @client {
    	id
    }
  }
`