import React from "react"
import { Query } from "react-apollo"
import { hopsInventoryTableQuery } from "../queries"
import shortid from "shortid"
import SortableTableContainer from "./common/sortableTableContainer"
import {
	UPDATE_HOPS_TABLE_SORT,
	UPDATE_HOPS_TABLE_ITEM_LIMIT,
	UPDATE_HOPS_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"

const HopsInventoryTableContainer = () => (
	<Query query={hopsInventoryTableQuery} fetchPolicy={"network-only"}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const columns = [
				{id: shortid.generate(), name: "Hop name"},
				{id: shortid.generate(), name: "Amount (lbs, oz)"},
				{id: shortid.generate(), name: "Country of origin"},
				{id: shortid.generate(), name: "Alpha acid %"},
				{id: shortid.generate(), name: "Cost per lb"},
				{id: shortid.generate(), name: "Purchase date"}
			]

			const { currentUser, hopsInventoryTable } = data
			const {
				sortBy,
				sortOrder,
				itemsPerPage,
				currentPage,
				filterString
			}	= hopsInventoryTable

			const inventory = currentUser.inventories.find(inventory => inventory.name === "Hops")
			const tableRows = inventory 
												? inventory.items.map(item => ({
														id: item.id,
														cells: [
															JSON.parse(item.object).name,
															item.currentQuantity,
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
					sortOrderMutation={UPDATE_HOPS_TABLE_SORT}
					columns={columns}
					tableRows={filteredRows || tableRows}
					sortBy={sortBy}
					sortOrder={sortOrder}
					itemsPerPageOptions={[5,25,50,100]}
					itemsPerPage={itemsPerPage}
					itemsPerPageMutation={UPDATE_HOPS_TABLE_ITEM_LIMIT}
					currentPage={currentPage}
					pageNumberMutation={UPDATE_HOPS_TABLE_PAGE_NUMBER}
					modalMutation={UPDATE_MODAL}
					entityType="inventoryItem"
				/>
			)

		}}
	</Query>
)

export default HopsInventoryTableContainer