import gql from "graphql-tag"

export const START_TIMER = gql`
  mutation startTimer($id: String!) {
    startTimer(id: $id) {
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
`

export const STOP_TIMER = gql`
  mutation stopTimer($id: String!) {
    stopTimer(id: $id) {
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
`

export const RESET_TIMER = gql`
  mutation resetTimer($id: String!) {
    resetTimer(id: $id) {
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
`

export const DECREMENT_TIMER = gql`
  mutation decrementTimer($id: String!) {
    decrementTimer(id: $id) {
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
`

export const UPDATE_TIMER = gql`
  mutation updateTimer($id: String!, $name: String, $duration: Int) {
    updateTimer(id: $id, name: $name, duration: $duration) {
      id
      name
      duration
      timerAlerts {
        id
        activated
        activationTime
      }
    }
  }`