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
  },
}