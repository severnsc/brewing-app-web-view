import gql from 'graphql-tag'
import { isLoggedInQuery } from '../queries'

export default {
  Mutation: {
    updateDashboardTableSort: (_, { cellName }, { cache }) => {

      const query = gql`
        query {
          dashboardTableSort @client {
            sortBy
            order
          }
        }
      `

      const previous = cache.readQuery({ query })

      let order = previous.dashboardTableSort.order
      if(previous.dashboardTableSort.sortBy === cellName){
        order = previous.dashboardTableSort.order === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        dashboardTableSort: {
          ...previous.dashboardTableSort,
          sortBy: cellName,
          order
        }
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

    updateViewModel: (_, { viewModel }, { cache }) => {

      const query = gql`
        query {
          viewModel @client
        }
      `

      const previous = cache.readQuery({ query })

      const data = {
        viewModel: {
          __typename: "ViewModel",
          isUsernameUnique: false
        }
      }

      cache.writeData({ query, data })

      return null

    },
  
  }
}