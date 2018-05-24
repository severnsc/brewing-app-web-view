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

    dashboardTableSort @client {
      sortBy
      order
    }

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

export const topLevelQuery = gql`
  query {
    isLoggedIn @client
    
    modalItem @client {
      type
      itemId
    }
    
  }
`