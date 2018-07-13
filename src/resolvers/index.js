import gql from 'graphql-tag'
import { modalQuery } from "../queries"

const dashboardTableQuery = gql`
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

const signupQuery = gql`
  query {
    signup @client {
      isUsernameUnique
      error
    }
  }
`

const timersQuery = gql`
  query {
    timers @client {
      sortBy
      sortOrder
      itemLimit
      filterString
      currentPage
    }
  }
`

export default {
  Mutation: {
    updateDashboardTableSort: (_, { cellName }, { cache }) => {

      const { dashboard } = cache.readQuery({ query: dashboardTableQuery })
      const { sortOrder, sortBy } = dashboard

      let order = sortOrder
      if(sortBy === cellName){
        order = sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        dashboard: {
          ...dashboard,
          sortOrder: order,
          sortBy: cellName
        }
      }

      cache.writeQuery({ query: dashboardTableQuery, data })

      return null
    },

    updateDashboardTableFilter: (_, { value }, { cache }) => {

      const { dashboard } = cache.readQuery({ query: dashboardTableQuery })

      const data = {
        dashboard: {
          ...dashboard,
          filterString: value,
          currentPage: 0
        }
      }

      cache.writeQuery({ query: dashboardTableQuery, data })

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
      let allInventoryItems = currentUser.inventories.map(inventory => inventory.items)
      allInventoryItems = [].concat.apply([], allInventoryItems)
      if(pageNumber >= allInventoryItems.length/value){
        pageNumber = Math.ceil(allInventoryItems.length/value) - 1
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

      const { dashboard } = cache.readQuery({ query: dashboardTableQuery })

      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        dashboard: {
          ...dashboard,
          currentPage: dashboard.currentPage + integer
        }
      }

      cache.writeQuery({ query: dashboardTableQuery, data })

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

      const { signup } = cache.readQuery({ query: signupQuery })

      const data = {
        signup: {
          ...signup,
          isUsernameUnique: bool
        }
      }

      cache.writeQuery({ query: signupQuery, data })

      return null

    },

    updateSignupError: (_, { error }, { cache }) => {

      const { signup } = cache.readQuery({ query: signupQuery })

      const data = {
        signup: {
          ...signup,
          error: error
        }
      }

      cache.writeQuery({ query: signupQuery, data })

      return null

    },

    updateModal: (_, { id, type }, { cache }) => {

      const { modal } = cache.readQuery({ query: modalQuery })

      const data = {
        modal: {
          ...modal,
          type: type,
          id: id,
        }
      }

      cache.writeQuery({ query: modalQuery, data })

      return null

    },

    updateTimersTableSort: (_, { cellName }, { cache }) => {

      const { timers } = cache.readQuery({ query: timersQuery })
      const { sortOrder, sortBy } = timers

      let order = sortOrder
      if(sortBy === cellName){
        order = sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        timers: {
          ...timers,
          sortOrder: order,
          sortBy: cellName
        }
      }

      cache.writeQuery({ query: timersQuery, data })

      return null
    },

    updateTimersTableFilter: (_, { value }, { cache }) => {

      const { timers } = cache.readQuery({ query: timersQuery })

      const data = {
        timers: {
          ...timers,
          filterString: value,
          currentPage: 0
        }
      }

      cache.writeQuery({ query: timersQuery, data })

      return null

    },

    updateTimersTableItemLimit: (_, { value }, { cache }) => {

       const query = gql`
        query {

          currentUser {
            timers
          }

          timers @client {
            sortBy
            sortOrder
            itemLimit
            filterString
            currentPage
          }
        }
      `

      const { currentUser, timers } = cache.readQuery({ query })

      let pageNumber = timers.currentPage
      if(pageNumber >= currentUser.timers.length/value){
        pageNumber = Math.ceil(currentUser.timers.length/value) - 1
      }

      const data = {
        currentUser,
        timers: {
          ...timers,
          itemLimit: value,
          currentPage: pageNumber
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    updateTimersTablePageNumber: (_, { type }, { cache }) => {

      const { timers } = cache.readQuery({ query: timersQuery })

      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        timers: {
          ...timers,
          currentPage: timers.currentPage + integer
        }
      }

      cache.writeQuery({ query: timersQuery, data })

      return null

    },

    updateActiveTimer: (_, { id }, { cache }) => {

      const query = gql`
        query {
          activeTimer @client {
            id
          }
        }
      `

      const { activeTimer } = cache.readQuery({ query })

      const data = {
        activeTimer: {
          ...activeTimer,
          id
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    updateInventoriesTableFilter: (_, { value }, { cache }) => {

      const { inventoriesTable } = cache.readQuery({ query: inventoriesTableQuery })

      const data = {
        inventoriesTable: {
          ...inventoriesTable,
          filterString: value,
          currentPage: 0
        }
      }

      cache.writeQuery({ query: inventoriesTableQuery, data })

      return null

    },

    updateInventoriesTableSort: (_, { cellName }, { cache }) => {

      const { inventoriesTable } = cache.readQuery({ query: inventoriesTableQuery })

      const { sortOrder, sortBy } = inventoriesTable

      let order = sortOrder
      if(sortBy === cellName){
        order = sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        inventoriesTable: {
          ...inventoriesTable,
          sortOrder: order,
          sortBy: cellName
        }
      }

      cache.writeQuery({ query: inventoriesTableQuery, data })

      return null

    },

    updateInventoriesTablePageNumber: (_, { type }, { cache }) => {

      const { inventoriesTable } = cache.readQuery({ query: inventoriesTableQuery })
      const { currentPage } = inventoriesTable
      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        inventoriesTable: {
          ...inventoriesTable,
          currentPage: currentPage + integer
        }
      }

      cache.writeQuery({ query: inventoriesTableQuery, data })

      return null

    },

    updateInventoriesTableItemLimit: (_, { value }, { cache }) => {

      const query = gql`
        query {

          currentUser {
            inventories
          }

          inventoriesTable @client {
            sortBy
            sortOrder
            itemLimit
            filterString
            currentPage
          }
        }
      `

      const { currentUser, inventoriesTable } = cache.readQuery({ query })

      let pageNumber = inventoriesTable.currentPage
      if(pageNumber >= currentUser.inventories.length/value){
        pageNumber = Math.ceil(currentUser.inventories.length/value) - 1
      }

      const data = {
        currentUser,
        inventoriesTable: {
          ...inventoriesTable,
          itemLimit: value,
          currentPage: pageNumber
        }
      }

      cache.writeQuery({ query, data })

      return null

    },
  
  }
}