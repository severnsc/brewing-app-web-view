import React from "react"
import { Query } from "react-apollo"
import { yeastInventoryTableQuery } from "../queries"
import shortid from "shortid"
import SortableTableContainer from "./common/sortableTableContainer"
import {
  UPDATE_YEAST_TABLE_SORT,
  UPDATE_YEAST_TABLE_ITEM_LIMIT,
  UPDATE_YEAST_TABLE_PAGE_NUMBER,
  UPDATE_MODAL
} from "../mutations"

const YeastInventoryTableContainer = () => (
	<Query query={yeastInventoryTableQuery} fetchPolicy={"network-only"}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error!</p>

			const columns = [
				{id: shortid.generate(), name: "Yeast name"},
				{id: shortid.generate(), name: "Amount"},
				{id: shortid.generate(), name: "Yeast lab"},
				{id: shortid.generate(), name: "Yeast number"},
				{id: shortid.generate(), name: "Yeast type"},
				{id: shortid.generate(), name: "Dry or Liquid"},
				{id: shortid.generate(), name: "Purchase date"}
			]

			const { currentUser, yeastInventoryTable } = data
			const {
				sortBy,
				sortOrder,
				itemsPerPage,
				currentPage,
				filterString
			} = yeastInventoryTable

			const inventory = currentUser.inventories.find(inventory => inventory.name === "Yeast")
			const tableRows = inventory
												? inventory.items.map(item => ({
														id: item.id,
														cells: [
															JSON.parse(item.object).name,
															item.currentQuantity,
															JSON.parse(item.object).name,
															JSON.parse(item.object).name,
															JSON.parse(item.object).name,
															JSON.parse(item.object).name,
															item.lastReorderDate
														]
													}))
												: []
			let filteredTableRows
			if(filterString){
				filteredTableRows = tableRows.filter(tableRow => {
					return tableRow.cells.find(cell => cell.toString().toLowerCase().includes(filterString))
				})
			}

			return(
				<SortableTableContainer
					sortOrderMutation={UPDATE_YEAST_TABLE_SORT}
          columns={columns}
          tableRows={filteredTableRows || tableRows}
          sortBy={sortBy}
          sortOrder={sortOrder}
          itemsPerPageOptions={[5, 25,50,100]}
          itemsPerPage={itemsPerPage}
          itemsPerPageMutation={UPDATE_YEAST_TABLE_ITEM_LIMIT}
          currentPage={currentPage}
          pageNumberMutation={UPDATE_YEAST_TABLE_PAGE_NUMBER}
          modalMutation={UPDATE_MODAL}
          entityType="inventoryItem"
				/>
			)

		}}
	</Query>
)

export default YeastInventoryTableContainer