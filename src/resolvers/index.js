import gql from 'graphql-tag'
import { modalQuery } from "../queries"

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
      const { sortOrder, sortBy } = previous.dashboard

      let order = sortOrder
      if(sortBy === cellName){
        order = sortOrder === "asc" ? "desc" : "asc"
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
          filterString: value,
          currentPage: 0
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

      const query = gql`
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

      const previous = cache.readQuery({ query })
      const { sortOrder, sortBy } = previous.timers

      let order = sortOrder
      if(sortBy === cellName){
        order = sortOrder === "asc" ? "desc" : "asc"
      }else{
        order = "asc"
      }

      const data = {
        timers: {
          ...previous.timers,
          sortOrder: order,
          sortBy: cellName
        }
      }

      cache.writeQuery({ query, data })

      return null
    },

    updateTimersTableFilter: (_, { value }, { cache }) => {

      const query = gql`
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

      const previous = cache.readQuery({ query })

      const data = {
        timers: {
          ...previous.timers,
          filterString: value,
          currentPage: 0
        }
      }

      cache.writeQuery({ query, data })

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

      const query = gql`
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

      const previous = cache.readQuery({ query })

      const integer = type === "INCREMENT" ? 1 : -1

      const data = {
        timers: {
          ...previous.timers,
          currentPage: previous.timers.currentPage + integer
        }
      }

      cache.writeQuery({ query, data })

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
  
  }
}