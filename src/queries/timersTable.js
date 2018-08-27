import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
  query {
    currentUser {
      id
      ...Timers
    }

    timersTable @client {
      sortBy
      sortOrder
      itemLimit
      filterString
      currentPage
    }
  }
  ${currentUserFragments.timers}
`