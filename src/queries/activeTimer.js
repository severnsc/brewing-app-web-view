import gql from "graphql-tag"

export default gql`
  query {
    activeTimer @client {
      id
    }

    currentUser {
      id
      timers {
        id
        name
        remainingDuration
        intervalDuration
        isRunning
        timerAlerts {
          id
          activated
          activationTime
        }
      }
    }
  }
`