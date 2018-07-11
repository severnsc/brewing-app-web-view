import gql from "graphql-tag"

export default gql`
  mutation udpateModal($id: String!, $type: String!) {
    updateModal(id: $id, type: $type) @client
  }
`