import gql from 'graphql-tag'
import {
  modalQuery,
  loginQuery,
  flashQuery,
  inventoriesQuery
} from "../queries"

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
    timersTable @client {
      sortBy
      sortOrder
      itemLimit
      filterString
      currentPage
    }
  }
`

const inventoriesTableQuery = gql`
  query {
    inventoriesTable @client {
      sortBy
      sortOrder
      itemLimit
      filterString
      currentPage
    }
  }
`

const tableQuery = gql`
  query {
    table(name: $name) @client {
      name
      sortBy
      sortOrder
      itemsPerPage
      currentPage
      filterString
    }
  }
`

export default {
  Query: {
    table: (_, { name }, { cache }) => {
      const query = gql`
        query {
          tables @client {
            name
            sortBy
            sortOrder
            itemsPerPage
            currentPage
            filterString
          }
        }
      `

      const { tables } = cache.readQuery({ query })

      const table = tables.find(i => i.name === name)

      return table
    }
  },
  Mutation: {
    updateTableSort: (_, { name, sortBy }, { cache }) => {

      const { table } = cache.readQuery({ query: tableQuery, variables: { name } })

      let order = table.sortOrder
      if(table.sortBy === sortBy){
        order = table.sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        table: {
          ...table,
          sortOrder: order,
          sortBy
        }
      }

      cache.writeQuery({ query: tableQuery, data, variables: { name } })

      return null
    },
    updateTableItemsPerPage: (_, { name, itemsPerPage }, { cache }) => {

      const { table } = cache.readQuery({ query: tableQuery, variables: { name } })
      const { currentUser } = cache.readQuery({ query: inventoriesQuery })
      const items = currentUser.inventories.find(i => i.name.toLowerCase() === name).items
      
      let pageNumber = table.currentPage
      if(pageNumber >= items.length/itemsPerPage){
        pageNumber = Math.ceil(items.length/itemsPerPage)
      }

      const data = {
        table: {
          ...table,
          itemsPerPage,
          currentPage: pageNumber
        }
      }

      cache.writeQuery({ query: tableQuery, data, variables: { name } }) 

      return null
    },
    updateTablePageNumber: (_, { name, type, pageNumber }, { cache }) => {

      const { table } = cache.readQuery({ query: tableQuery, variables: { name } })

      let { currentPage } = table
      switch(type){
        
        case "INCREMENT":
          currentPage = currentPage + 1
          break

        case "DECREMENT":
          currentPage = currentPage - 1
          break

        default:
          currentPage = pageNumber

      }

      const data = {
        table: {
          ...table,
          currentPage
        }
      }

      cache.writeQuery({ query: tableQuery, data, variables: { name } })

      return null
    },
    updateTableFilter: (_, { name, filterString }, { cache }) => {

      const { table } = cache.readQuery({ query: tableQuery, variables: { name } })

      const data = {
        table: {
          ...table,
          filterString,
          currentPage: 1
        }
      }

      cache.writeQuery({ query: tableQuery, data, variables: { name } })

      return null

    },
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

      const { timersTable } = cache.readQuery({ query: timersQuery })
      const { sortOrder, sortBy } = timersTable

      let order = sortOrder
      if(sortBy === cellName){
        order = sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        timersTable: {
          ...timersTable,
          sortOrder: order,
          sortBy: cellName
        }
      }

      cache.writeQuery({ query: timersQuery, data })

      return null
    },

    updateTimersTableFilter: (_, { value }, { cache }) => {

      const { timersTable } = cache.readQuery({ query: timersQuery })

      const data = {
        timersTable: {
          ...timersTable,
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

          timersTable @client {
            sortBy
            sortOrder
            itemLimit
            filterString
            currentPage
          }
        }
      `

      const { currentUser, timersTable } = cache.readQuery({ query })

      let pageNumber = timersTable.currentPage
      if(pageNumber >= currentUser.timers.length/value){
        pageNumber = Math.ceil(currentUser.timers.length/value) - 1
      }

      const data = {
        currentUser,
        timersTable: {
          ...timersTable,
          itemLimit: value,
          currentPage: pageNumber
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    updateTimersTablePageNumber: (_, { type }, { cache }) => {

      const { timersTable } = cache.readQuery({ query: timersQuery })

      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        timersTable: {
          ...timersTable,
          currentPage: timersTable.currentPage + integer
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

    updateLogin: (_, { error }, { cache }) => {

      const { login } = cache.readQuery({ query: loginQuery })

      const data = {
        login: {
          ...login,
          error
        }
      }

      cache.writeQuery({ query: loginQuery, data})

      return data

    },

    updateFlash: (_, { message }, { cache }) => {

      const { flash } = cache.readQuery({ query: flashQuery })

      const data = {
        flash: {
          ...flash,
          message
        }
      }

      cache.writeQuery({ query: flashQuery, data })

      return null

    },
  
  }
}