import React from 'react'
import { Query } from 'react-apollo'
import shortid from 'shortid'
import SortableTableContainer from './sortableTableContainer'
import { dashboardTableQuery } from '../queries'

const DashboardTableContainer = () => {

  const columns = [
    {id: shortid.generate(), name: "Item name"},
    {id: shortid.generate(), name: "Current Quantity"},
    {id: shortid.generate(), name: "Reorder Threshold"},
    {id: shortid.generate(), name: "Unit Cost"},
    {id: shortid.generate(), name: "Reorder Cost"}
  ]

  return(
    <Query query={dashboardTableQuery}>
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
            {id: shortid.generate(), columnName: "Item name", value: inventoryItem.object.name},
            {id: shortid.generate(), columnName: "Current Quantity", value: `${inventoryItem.currentQuantity} ${inventoryItem.quantityUnit}`},
            {id: shortid.generate(), columnName: "Reorder Threshold", value: `${inventoryItem.reorderThreshold} ${inventoryItem.quantityUnit}`},
            {id: shortid.generate(), columnName: "Unit Cost", value: `${inventoryItem.unitCost} ${inventoryItem.costUnit}`},
            {id: shortid.generate(), columnName: "Reorder Cost", value: `${inventoryItem.reorderCost} ${inventoryItem.costUnit}`}
          ]

          return {id: inventoryItem.id, cells}
        })

        const sort = data.dashboardTableSort

        return(
          <SortableTableContainer
            columns={columns}
            tableRows={tableRows}
            sort={sort}
          />
        )
      }}
    </Query>
  )
}

export default DashboardTableContainer