import React from 'react'
import { Query } from 'react-apollo'
import shortid from 'shortid'
import SortableTableContainer from './common/sortableTableContainer'
import { dashboardTableQuery } from '../queries'
import {
  UPDATE_DASHBOARD_TABLE_SORT,
  UPDATE_DASHBOARD_ITEM_LIMIT,
  UPDATE_DASHBOARD_TABLE_PAGE_NUMBER,
  UPDATE_MODAL
} from "../mutations"

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
        if(error){
          console.log(error)
          return <p>Error</p>
        }

        //Returns an array of arrays
        let allInventoryItems = data.currentUser.inventories.map(inventory => {
          return inventory.items
        })

        //Flattens to a simple aray
        allInventoryItems = [].concat.apply([], allInventoryItems)

        const tableRows = allInventoryItems.map(inventoryItem => {
          const cells = [
            {id: shortid.generate(), columnName: "Item name", value: JSON.parse(inventoryItem.object).name},
            {id: shortid.generate(), columnName: "Current Quantity", value: inventoryItem.currentQuantity},
            {id: shortid.generate(), columnName: "Reorder Threshold", value: inventoryItem.reorderThreshold},
            {id: shortid.generate(), columnName: "Unit Cost", value: inventoryItem.unitCost},
            {id: shortid.generate(), columnName: "Reorder Cost", value: inventoryItem.reorderCost}
          ]

          return {id: inventoryItem.id, cells}
        })

        let filteredTableRows
        if(data.dashboardTableFilterString !== ""){
          filteredTableRows = tableRows.filter(tableRow => {
            return tableRow.cells.find(cell => cell.value.toString().toLowerCase().includes(data.dashboardTableFilterString))
          })
        }

        const sort = data.dashboardTableSort
        const itemsPerPage = parseInt(data.dashboardItemLimit, 10)
        const currentPage = data.dashboardTableCurrentPage

        return(
          <SortableTableContainer
            sortOrderMutation={UPDATE_DASHBOARD_TABLE_SORT}
            columns={columns}
            tableRows={filteredTableRows || tableRows}
            sort={sort}
            itemsPerPage={itemsPerPage}
            itemsPerPageMutation={UPDATE_DASHBOARD_ITEM_LIMIT}
            currentPage={currentPage}
            pageNumberMutation={UPDATE_DASHBOARD_TABLE_PAGE_NUMBER}
            modalMutation={UPDATE_MODAL}
          />
        )
      }}
    </Query>
  )
}

export default DashboardTableContainer