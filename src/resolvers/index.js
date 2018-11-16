import gql from 'graphql-tag'
import {
  modalQuery,
  loginQuery,
  flashQuery,
  inventoriesQuery,
  tableQuery,
  signupQuery
} from "../queries"

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