import gql from 'graphql-tag'
import { isLoggedInQuery } from '../queries'

export default {
  Mutation: {
    updateDashboardTableSort: (_, { cellName }, { cache }) => {

      const query = gql`
        query {
          dashboardTableSortBy @client
          dashboardTableSortOrder @client
        }
      `

      const previous = cache.readQuery({ query })

      let order = previous.dashboardTableSortOrder
      if(previous.dashboardTableSortBy === cellName){
        order = previous.dashboardTableSortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        dashboardTableSortBy: cellName,
        dashboardTableSortOrder: order
      }

      cache.writeQuery({ query, data })

      return null
    },

    updateDashboardTableFilter: (_, { value }, { cache }) => {

      cache.writeData({
        data: {
          dashboardTableFilterString: value,
          dashboardTableCurrentPage: 0
        }
      })

      return null

    },

    updateDashboardItemLimit: (_, { value }, { cache }) => {

      cache.writeData({
        data: {
          dashboardItemLimit: value
        }
      })

      return null

    },

    updateDashboardTablePageNumber: (_, { type }, { cache }) => {

      const query = gql`
        query {
          dashboardTableCurrentPage @client
        }
      `

      const previous = cache.readQuery({ query })

      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        dashboardTableCurrentPage: previous.dashboardTableCurrentPage + integer
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
  
  }
}