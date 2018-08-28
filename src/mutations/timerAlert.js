import gql from "graphql-tag"

export const CREATE_TIMER_ALERT = gql`
  mutation createTimerAlert($timerId: String!, $activationTime: Int!, $message: String!) {
    createTimerAlert(timerId: $timerId, activationTime: $activationTime, message: $message) {
      id
      activationTime
      message
      activated
    }
  }
`

export const UPDATE_TIMER_ALERT = gql`
  mutation updateTimerAlert($id: String!, $activationTime: Int, $message: String) {
    updateTimerAlert(id: $id, activationTime: $activationTime, message: $message) {
      id
      activationTime
      activated
      message
    }
  }
`

export const ACTIVATE_TIMER_ALERT = gql`
  mutation activateTimerAlert($id: String!) {
    activateTimerAlert(id: $id) {
      id
      message
      activated
    }
  }
`

export const DELETE_TIMER_ALERT = gql`
  mutation deleteTimerAlert($id: String!) {
    deleteTimerAlert(id: $id) {
      id
    }
  }
`