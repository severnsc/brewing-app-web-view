import gql from "graphql-tag"
import { currentUserFragments } from "../fragments"

export default gql`
  query {
    currentUser {
      ...Timers
    }
  }
  ${currentUserFragments.timers}
`