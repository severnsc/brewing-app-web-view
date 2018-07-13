import React from "react"
import SortableTableContainer from "./common/sortableTableContainer"
import { Query } from "react-apollo"
import { inventoriesTableQuery } from "../queries"
import shortid from "shortid"
import {
	UPDATE_MODAL,
	UPDATE_INVENTORIES_TABLE_SORT,
	UPDATE_INVENTORIES_TABLE_ITEM_LIMIT,
	UPDATE_INVENTORIES_TABLE_PAGE_NUMBER
} from "../mutations"

const InventoriesTableContainer = () => (
	<Query query={inventoriesTableQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error...</p>

			const { currentUser, inventoriesTable } = data
			const inventories = currentUser.inventories

			const columns = [
		    {id: shortid.generate(), name: "Inventory name"},
		    {id: shortid.generate(), name: "Number of items"}
		  ]

		  const tableRows = inventories.map(inventory => {
		  	const cells = [
		  		inventory.name,
		  		inventory.items.length
		  	]
		  	return {id: inventory.id, cells}
		  })

		  const {
		  	filterString,
		  	sortBy,
		  	sortOrder,
		  	itemLimit,
		  	currentPage
		  } = inventoriesTable

		  let filteredTableRows
		  if(filterString !== ""){
		  	filteredTableRows = tableRows.filter(tableRow => {
		  		return tableRow.cells.find(cell => cell.toString().toLowerCase().includes(filterString))
		  	})
		  }

			return(
				<SortableTableContainer
					sortOrderMutation={UPDATE_INVENTORIES_TABLE_SORT}
		      columns={columns}
		      tableRows={filteredTableRows || tableRows}
		      sortBy={sortBy}
		      sortOrder={sortOrder}
		      itemsPerPage={itemLimit}
		      itemsPerPageMutation={UPDATE_INVENTORIES_TABLE_ITEM_LIMIT}
		      currentPage={currentPage}
		      pageNumberMutation={UPDATE_INVENTORIES_TABLE_PAGE_NUMBER}
		      modalMutation={UPDATE_MODAL}
		      entityType="inventory"
				/>
			)

		}}
	</Query>
)

export default InventoriesTableContainer