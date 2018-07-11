import gql from "graphql-tag"

export default gql`
  query {
    currentUser {
      timers {
        id
        name
        duration
        timerAlerts {
          id
          activationTime
          message
          activated
        }
      }
    }
  }
`