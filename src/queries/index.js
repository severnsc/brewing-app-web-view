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

    dashboardTableFilter @client {
      filterString
      filterScope
    }
  }
`

export const dashboardTableFilterQuery = gql`
  query {
    dashboardTableFilter @client {
      filterString
      filterScope
    }
  }
`