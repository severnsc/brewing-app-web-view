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

const maltInventoryTableQuery = gql`
  query {
    maltInventoryTable @client {
      sortBy
      sortOrder
      itemLimit
      filterString
      currentPage
    }
  }
`

const hopsInventoryTableQuery = gql`
  query {
    hopsInventoryTable @client {
      sortBy
      sortOrder
      itemsPerPage
      currentPage
      filterString
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

    updateMaltInventoryTableSort: (_, { cellName }, { cache }) => {

      const { maltInventoryTable } = cache.readQuery({ query: maltInventoryTableQuery })

      const { sortOrder, sortBy } = maltInventoryTable

      let order = sortOrder
      if(sortBy === cellName){
        order = sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        maltInventoryTable: {
          ...maltInventoryTable,
          sortOrder: order,
          sortBy: cellName
        }
      }

      cache.writeQuery({ query: maltInventoryTableQuery, data })

      return null
    },

    updateMaltInventoryTablePageNumber:(_, { type }, { cache }) => {

      const { maltInventoryTable } = cache.readQuery({ query: maltInventoryTableQuery })

      const { currentPage } = maltInventoryTable
      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        maltInventoryTable: {
          ...maltInventoryTable,
          currentPage: currentPage + integer
        }
      }

      cache.writeQuery({ query: maltInventoryTableQuery, data })

      return null

    },

    updateMaltInventoryTableItemLimit: (_, { value }, { cache }) => {

      const query = gql`
        query {

          currentUser {
            inventories {
              name
              items
            }
          }

          maltInventoryTable @client {
            sortBy
            sortOrder
            itemLimit
            filterString
            currentPage
          }
        }
      `

      const { currentUser, maltInventoryTable } = cache.readQuery({ query })

      let pageNumber = maltInventoryTable.currentPage
      const malts = currentUser.inventories.find(inventory => inventory.name === "Malt").items
      if(pageNumber >= malts.length/value){
        pageNumber = Math.ceil(malts.length/value) - 1
      }

      const data = {
        currentUser,
        maltInventoryTable: {
          ...maltInventoryTable,
          itemLimit: value,
          currentPage: pageNumber
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    updateMaltInventoryTableFilter: (_, { value }, { cache }) => {

      const { maltInventoryTable } = cache.readQuery({ query: maltInventoryTableQuery })

      const data = {
        maltInventoryTable: {
          ...maltInventoryTable,
          filterString: value,
          currentPage: 0
        }
      }

      cache.writeQuery({ query: maltInventoryTableQuery, data })

      return null

    },

    updateHopsInventoryTableSort: (_, { cellName }, { cache }) => {

      const { hopsInventoryTable } = cache.readQuery({ query: hopsInventoryTableQuery })

      const { sortOrder, sortBy } = hopsInventoryTable

      let order = sortOrder
      if(sortBy === cellName){
        order = sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        hopsInventoryTable: {
          ...hopsInventoryTable,
          sortOrder: order,
          sortBy: cellName
        }
      }

      cache.writeQuery({ query: hopsInventoryTableQuery, data })

      return null      

    },

    updateHopsInventoryTablePageNumber: (_, { type }, { cache }) => {

      const { hopsInventoryTable } = cache.readQuery({ query: hopsInventoryTableQuery })

      const { currentPage } = hopsInventoryTable
      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        hopsInventoryTable: {
          ...hopsInventoryTable,
          currentPage: currentPage + integer
        }
      }

      cache.writeQuery({ query: hopsInventoryTableQuery, data })

      return null

    },

    updateHopsInventoryTableItemLimit: (_, { value }, { cache }) => {

      const query = gql`
        query {

          currentUser {
            inventories {
              name
              items
            }
          }

          hopsInventoryTable @client {
            sortBy
            sortOrder
            itemsPerPage
            currentPage
          }
        }
      `

      const { currentUser, hopsInventoryTable } = cache.readQuery({ query })

      let pageNumber = hopsInventoryTable.currentPage
      const hops = currentUser.inventories.find(inventory => inventory.name === "Hops").items
      if(pageNumber >= hops.length/value){
        pageNumber = Math.ceil(hops.length/value) - 1
      }

      const data = {
        currentUser,
        hopsInventoryTable: {
          ...hopsInventoryTable,
          itemsPerPage: value,
          currentPage: pageNumber
        }
      }

      cache.writeQuery({ query, data })

      return null

    },

    updateHopsInventoryTableFilter: (_, { value }, { cache }) => {

      const { hopsInventoryTable } = cache.readQuery({ query: hopsInventoryTableQuery })

      const data = {
        hopsInventoryTable: {
          ...hopsInventoryTable,
          filterString: value,
          currentPage: 0
        }
      }

      cache.writeQuery({ query: hopsInventoryTableQuery, data })

      return null

    },
  
  }
}