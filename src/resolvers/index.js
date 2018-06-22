import gql from 'graphql-tag'
import { dashboardLocalQuery } from "../queries"

export default {
  Mutation: {
    updateDashboardTableSort: (_, { cellName }, { cache }) => {

      const query = gql`
        query {
          dashboard @client {
            sortBy
            sortOrder
            itemLimit
            filterString
            currentPage
          }
        }
      `

      const previous = cache.readQuery({ query })

      let order = previous.dashboard.sortOrder
      if(previous.dashboard.sortBy === cellName){
        order = previous.dashboard.sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        dashboard: {
          ...previous.dashboard,
          sortOrder: order,
          sortBy: cellName
        }
      }

      cache.writeQuery({ query, data })

      return null
    },

    updateDashboardTableFilter: (_, { value }, { cache }) => {

      const query = gql`
        query {
          dashboard @client {
            sortBy
            sortOrder
            itemLimit
            filterString
            currentPage
          }
        }
      `

      const previous = cache.readQuery({ query })

      const data = {
        dashboard: {
          ...previous.dashboard,
          filterString: value
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    updateDashboardItemLimit: (_, { value }, { cache }) => {

       const query = gql`
        query {

          currentUser {
            inventories {
              items
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

      const { currentUser, dashboard } = cache.readQuery({ query })

      let pageNumber = dashboard.currentPage
      if(pageNumber > currentUser.inventories[0].items.length/value){
        pageNumber = Math.ceil(currentUser.inventories[0].items.length/value) - 1
      }

      const data = {
        currentUser,
        dashboard: {
          ...dashboard,
          itemLimit: value,
          currentPage: pageNumber
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    updateDashboardTablePageNumber: (_, { type }, { cache }) => {

      const query = gql`
        query {
          dashboard @client {
            sortBy
            sortOrder
            itemLimit
            filterString
            currentPage
          }
        }
      `

      const previous = cache.readQuery({ query })

      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        dashboard: {
          ...previous.dashboard,
          currentPage: previous.dashboard.currentPage + integer
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    setIsLoggedIn: (_, { bool }, { cache }) => {

      cache.writeData({
        data: {
          isLoggedIn: bool
        }
      })

      return null

    },

    updateSignupUsernameError: (_, { bool }, { cache }) => {

      const query = gql`
        query {
          signup @client {
            isUsernameUnique
            error
          }
        }
      `

      const previous = cache.readQuery({ query })

      const data = {
        signup: {
          ...previous.signup,
          isUsernameUnique: bool
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    updateSignupError: (_, { error }, { cache }) => {

      const query = gql`
        query {
          signup @client {
            isUsernameUnique
            error
          }
        }
      `

      const previous = cache.readQuery({ query })

      const data = {
        signup: {
          ...previous.signup,
          error: error
        }
      }

      cache.writeQuery({ query, data })

      return null

    },
  
  }
}