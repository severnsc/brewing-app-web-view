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