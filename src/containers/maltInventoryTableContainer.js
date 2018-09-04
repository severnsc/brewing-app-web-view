import React from "react"
import { Query } from "react-apollo"
import { maltInventoryTableQuery } from "../queries"
import SortableTableContainer from "./common/sortableTableContainer"
import shortid from "shortid"
import {
	UPDATE_MALT_TABLE_SORT,
	UPDATE_MALT_TABLE_ITEM_LIMIT,
	UPDATE_MALT_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"

const MaltInventoryTableContainer = () => (
	<Query query={maltInventoryTableQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const columns = [
				{id: shortid.generate(), name: "Malt name"},
				{id: shortid.generate(), name: "Amount (lbs, oz)"},
				{id: shortid.generate(), name: "Malt type"},
				{id: shortid.generate(), name: "Malt color"},
				{id: shortid.generate(), name: "Country of origin"},
				{id: shortid.generate(), name: "Cost per lb"},
				{id: shortid.generate(), name: "Purchase date"}
			]

			const { maltInventoryTable, currentUser } = data

			const {
				sortBy,
				sortOrder,
				itemLimit,
				currentPage,
				filterString
			} = maltInventoryTable

			const inventory = currentUser.inventories
																	 .find(inventory => inventory.name === "Malt")
			const tableRows = inventory
												? inventory.items.map(item => ({
																					 	id: item.id,
																					 	cells: [
																					 		JSON.parse(item.object).name,
																					 		item.currentQuantity,
																					 		JSON.parse(item.object).name,
																					 		JSON.parse(item.object).name,
																					 		JSON.parse(item.object).name,
																					 		item.unitCost,
																					 		item.lastReorderDate
																					 	]
																					}))
												: []

			let filteredRows															
			if(filterString){
				filteredRows = tableRows.filter(tableRow => {
					return tableRow.cells.find(cell => cell.toString().toLowerCase().includes(filterString))
				})
			}

			return(
				<SortableTableContainer
					sortOrderMutation={UPDATE_MALT_TABLE_SORT}
					columns={columns}
					tableRows={filteredRows || tableRows}
					sortBy={sortBy}
					sortOrder={sortOrder}
					itemsPerPageOptions={[5,25,50,100]}
					itemsPerPage={itemLimit}
					itemsPerPageMutation={UPDATE_MALT_TABLE_ITEM_LIMIT}
					currentPage={currentPage}
					pageNumberMutation={UPDATE_MALT_TABLE_PAGE_NUMBER}
					modalMutation={UPDATE_MODAL}
					entityType="inventoryItem"
				/>
			)

		}}
	</Query>
)

export default MaltInventoryTableContainer