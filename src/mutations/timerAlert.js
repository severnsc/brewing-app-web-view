import gql from "graphql-tag"

export const UPDATE_TIMER_ALERT = gql`
  mutation updateTimerAlert($id: String!, $activationTime: Int, $message: String) {
    updateTimerAlert(id: $id, activationTime: $activationTime, message: $message) {
      id
      activationTime
      activated
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