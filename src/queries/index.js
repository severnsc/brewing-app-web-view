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

    dashboard @client {
      sortBy
      sortOrder
      itemLimit
      filterString
      currentPage
    }

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

export const signupViewModelQuery = gql`
  query {
    viewModel @client {
      isUsernameUnique
      error
    }
  }
`

export const loginViewModelQuery = gql`
  query {
    viewModel @client {
      error
    }
  }
`

export const profileViewModelQuery = gql`
  query {
    currentUser {
      userName
    }
  }
`