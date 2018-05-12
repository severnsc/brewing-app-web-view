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
  }
`