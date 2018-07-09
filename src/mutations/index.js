import gql from 'graphql-tag'

export const UPDATE_DASHBOARD_TABLE_SORT = gql`
  mutation updateDashboardTableSort($cellName: String!) {
    updateDashboardTableSort(cellName: $cellName) @client
  }
`

export const UPDATE_DASHBOARD_TABLE_FILTER = gql`
  mutation updateDashboardTableFilter($value: String!) {
    updateDashboardTableFilter(value: $value) @client
  }
`

export const UPDATE_DASHBOARD_ITEM_LIMIT = gql`
  mutation updateDashboardItemLimit($value: Number!) {
    updateDashboardItemLimit(value: $value) @client
  }
`

export const UPDATE_DASHBOARD_TABLE_PAGE_NUMBER = gql`
  mutation updateDashboardTablePageNumber($type: String!) {
    updateDashboardTablePageNumber(type: $type) @client
  }
`

export const LOGIN_MUTATION = gql`
  mutation setIsLoggedIn($bool: Boolean) {
    setIsLoggedIn(bool: $bool) @client
  }
`

export const UPDATE_SIGNUP_ERROR = gql`
  mutation updateSignupError($error: String!) {
    updateSignupError(error: $error) @client
  }
`

export const UPDATE_SIGNUP_USERNAME_ERROR = gql`
  mutation updateSignupUsernameError($bool: Boolean!) {
    updateSignupUsernameError(bool: $bool) @client
  }
`

export const UPDATE_MODAL = gql`
  mutation udpateModal($id: String!, $type: String!) {
    updateModal(id: $id, type: $type) @client
  }
`

export const UPDATE_INVENTORY_ITEM = gql`
  mutation updateInventoryItem($id: String!, $inventoryId: String!, $object: String!, $costUnit: String!, $unitCost: Float!, $reorderCost: Float!, $quantityUnit: String!, $currentQuantity: Float!, $reorderQuantity: Float!, $reorderThreshold: Float!, $lastReorderDate: String!, $deliveryDate: String!) {
    updateInventoryItem(id: $id, inventoryId: $inventoryId, object: $object, costUnit: $costUnit, unitCost: $unitCost, reorderCost: $reorderCost, quantityUnit: $quantityUnit, currentQuantity: $currentQuantity, reorderQuantity: $reorderQuantity, reorderThreshold: $reorderThreshold, lastReorderDate: $lastReorderDate, deliveryDate: $deliveryDate) {
      id
    }
  }
`

export const UPDATE_TIMERS_TABLE_FILTER = gql`
  mutation updateTimersTableFilter($value: String!) {
    updateTimersTableFilter(value: $value) @client
  }
`

export const UPDATE_TIMERS_TABLE_SORT = gql`
  mutation updateTimersTableSort($cellName: String!) {
    updateTimersTableSort(cellName: $cellName) @client
  }
`

export const UPDATE_TIMERS_TABLE_ITEM_LIMIT = gql`
  mutation updateTimersTableItemLimit($value: Number!) {
    updateTimersTableItemLimit(value: $value) @client
  }
`

export const UPDATE_TIMERS_TABLE_PAGE_NUMBER = gql`
  mutation updateTimersTablePageNumber($type: String!) {
    updateTimersTablePageNumber(type: $type) @client
  }
`

export const UPDATE_ACTIVE_TIMER = gql`
  mutation updateActiveTimer($id: String!) {
    updateActiveTimer(id: $id) @client
  }
`

export const START_TIMER = gql`
  mutation startTimer($id: String!) {
    startTimer(id: $id) {
      id
      remainingDuration
      isRunning
    }
  }
`

export const STOP_TIMER = gql`
  mutation stopTimer($id: String!) {
    stopTimer(id: $id) {
      id
      remainingDuration
      isRunning
    }
  }
`

export const RESET_TIMER = gql`
  mutation resetTimer($id: String!) {
    resetTimer(id: $id) {
      id
      remainingDuration
      isRunning
    }
  }
`