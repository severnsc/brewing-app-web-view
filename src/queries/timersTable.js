import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
  query {
    currentUser {
      id
      ...Timers
    }

    table(name: $name) @client {
      name
      sortBy
      sortOrder
      itemsPerPage
      filterString
      currentPage
    }
  }
  ${currentUserFragments.timers}
`