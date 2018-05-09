import React from 'react'
import { Query } from "react-apollo"
import gql from "graphql-tag"
import SortableTable from '../components/sortableTable'
import shortid from 'shortid'

const Dashboard = () => {

  const query = gql`
    query {
      currentUser {
        inventories {
          items {
            id
            object
            quantityUnit
            currentQuantity
            reorderThreshold
            costUnit
            unitCost
            reorderCost
          }
        }
      }
    }
  `

  const columns = [
    {id: shortid.generate(), name: "Item name"},
    {id: shortid.generate(), name: "Current Quantity"},
    {id: shortid.generate(), name: "Reorder Threshold"},
    {id: shortid.generate(), name: "Unit Cost"},
    {id: shortid.generate(), name: "Reorder Cost"}
  ]

  const toggleSortOrder = () => {}

  return(
    <Query query={query}>
      {({loading, error, data}) => {

        if(loading) return <p>Loading...</p>
        if(error) return <p>Error</p>

        //Returns an array of arrays
        let allInventoryItems = data.currentUser.inventories.map(inventory => {
          return inventory.items
        })

        //Flattens to a simple aray
        allInventoryItems = [].concat.apply([], allInventoryItems)

        const tableRows = allInventoryItems.map(inventoryItem => {
          const cells = [
            {id: shortid.generate(), columnName: "Item Name", value: inventoryItem.object.name},
            {id: shortid.generate(), columnName: "Current Quantity", value: `${inventoryItem.currentQuantity} ${inventoryItem.quantityUnit}`},
            {id: shortid.generate(), columnName: "Reorder Threshold", value: `${inventoryItem.reorderThreshold} ${inventoryItem.quantityUnit}`},
            {id: shortid.generate(), columnName: "Unit Cost", value: `${inventoryItem.unitCost} ${inventoryItem.costUnit}`},
            {id: shortid.generate(), columnName: "Reorder Cost", value: `${inventoryItem.reorderCost} ${inventoryItem.costUnit}`}
          ]

          return {id: inventoryItem.id, cells}
        })

        return(
          <SortableTable
            columns={columns}
            toggleSortOrder={toggleSortOrder}
            tableRows={tableRows}
          />
        )
      }}
    </Query>
  )
}

export default Dashboard