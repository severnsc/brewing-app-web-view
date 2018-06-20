import gql from 'graphql-tag'

export const dashboardTableQuery = gql`
  query {
    currentUser {
      inventories {
        items {
          id
          object
          quantityUnit
          currentQuantity
          reorderThreshold
          costUnit
          unitCost
          reorderCost
        }
      }
    }

    dashboardTableSortBy @client

    dashboardTableSortOrder @client

    dashboardTableFilterString @client

    dashboardItemLimit @client

    dashboardTableCurrentPage @client
  }
`

export const dashboardItemLimitQuery = gql`
  query {
    dashboardItemLimit @client
  }
`

export const isLoggedInQuery = gql`
  query {
    isLoggedIn @client
  }
`