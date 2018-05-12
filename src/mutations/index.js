import gql from 'graphql-tag'

export const UPDATE_DASHBOARD_TABLE_SORT = gql`
  mutation updateDashboardTableSort($cellName: String!) {
    updateDashboardTableSort(cellName: $cellName) @client
  }
`