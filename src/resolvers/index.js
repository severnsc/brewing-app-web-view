import gql from 'graphql-tag'

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

      const newViewModel = viewModel.sortObject
                     ? {...viewModel, sortObject: {...viewModel.sortObject, __typename: "SubViewModel"}}
                     : viewModel

      cache.writeData({
        data: {
          viewModel: {
            __typename: "ViewModel",
            ...newViewModel
          }
        }
      })

      return null

    },
  
  }
}