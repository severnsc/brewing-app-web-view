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

export const UPDATE_DASHBOARD_TABLE_FILTER_SCOPE = gql`
  mutation updateDashboardTableFilterScope($type: String!) {
    updateDashboardTableFilterScope(type: $type) @client
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

export const UPDATE_DASHBOARD_MODAL = gql`
  mutation updateDashboardModal($id: String!) {
    updateDashboardModal(id: $id) @client
  }
`