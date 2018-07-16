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
			if(error) return <p>Error!</p>

			const columns = [
				{id: shortid.generate(), name: "Malt name"},
				{id: shortid.generate(), name: "Malt type"},
				{id: shortid.generate(), name: "Amount"}
			]

			const { maltInventoryTable, currentUser } = data

			const {
				sortBy,
				sortOrder,
				itemLimit,
				currentPage,
				filterString
			} = maltInventoryTable

			const tableRows = currentUser.inventories
																	 .find(inventory => inventory.name === "Malt")
																	 .items.map(item => ({
																	 	id: item.id,
																	 	cells: [JSON.parse(item.object).name, JSON.parse(item.object).name, item.currentQuantity]
																	 }))

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