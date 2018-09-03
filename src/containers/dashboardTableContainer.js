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
    <Query query={dashboardTableQuery} fetchPolicy={"network-only"}>
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
            JSON.parse(inventoryItem.object).name,
            inventoryItem.currentQuantity,
            inventoryItem.reorderThreshold,
            inventoryItem.unitCost,
            inventoryItem.reorderCost
          ]

          return {id: inventoryItem.id, cells}
        })
          
        let filteredTableRows
        if(data.dashboard.filterString !== ""){
          filteredTableRows = tableRows.filter(tableRow => {
            return tableRow.cells.find(cell => cell.toString().toLowerCase().includes(data.dashboard.filterString))
          })
        }

        const sortBy = data.dashboard.sortBy
        const sortOrder = data.dashboard.sortOrder
        const itemsPerPage = parseInt(data.dashboard.itemLimit, 10)
        const currentPage = data.dashboard.currentPage

        return(
          <SortableTableContainer
            sortOrderMutation={UPDATE_DASHBOARD_TABLE_SORT}
            columns={columns}
            tableRows={filteredTableRows || tableRows}
            sortBy={sortBy}
            sortOrder={sortOrder}
            itemsPerPageOptions={[25,50,100]}
            itemsPerPage={itemsPerPage}
            itemsPerPageMutation={UPDATE_DASHBOARD_ITEM_LIMIT}
            currentPage={currentPage}
            pageNumberMutation={UPDATE_DASHBOARD_TABLE_PAGE_NUMBER}
            modalMutation={UPDATE_MODAL}
            entityType="inventoryItem"
          />
        )
      }}
    </Query>
  )
}

export default DashboardTableContainer