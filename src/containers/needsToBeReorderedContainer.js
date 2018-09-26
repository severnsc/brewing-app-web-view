import React from "react"
import { Query } from "react-apollo"
import { needsToBeReorderedTableQuery } from "../queries"
import {
	UPDATE_NEEDS_TO_BE_REORDERED_TABLE_SORT,
	UPDATE_NEEDS_TO_BE_REORDERED_TABLE_ITEM_LIMIT,
	UPDATE_NEEDS_TO_BE_REORDERED_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"
import SortableTableContainer from "./common/sortableTableContainer"
import shortid from "shortid"

const NeedsToBeReorderedContainer = () => (
	<Query query={needsToBeReorderedTableQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const columns = [
				{id: shortid.generate(), name: "Item name"},
				{id: shortid.generate(), name: "Inventory name"},
				{id: shortid.generate(), name: "Amount"},
				{id: shortid.generate(), name: "Reorder quantity"},
				{id: shortid.generate(), name: "Unit cost"},
				{id: shortid.generate(), name: "Reorder cost"}
			]

			const { currentUser } = data
			const items = currentUser.inventories.map(inventory => inventory.items).flat()
			const itemsToReorder = items.filter(item => item.currentQuantity <= item.reorderThreshold)
			const tableRows = itemsToReorder.map(item => ({
				id: item.id,
				cells: [
					JSON.parse(item.object).name,
					currentUser.inventories.find(inv => inv.id === item.inventory.id).name,
					item.currentQuantity,
					item.reorderQuantity,
					item.unitCost,
					item.reorderCost
				]
			}))

			const {
				sortBy,
				sortOrder,
				itemLimit,
				currentPage
			} = data.needsToBeReorderedTable

			return(
				<SortableTableContainer
					columns={columns}
					tableRows={tableRows}
					sortBy={sortBy}
					sortOrder={sortOrder}
					sortOrderMutation={UPDATE_NEEDS_TO_BE_REORDERED_TABLE_SORT}
					itemsPerPage={itemLimit}
					itemsPerPageMutation={UPDATE_NEEDS_TO_BE_REORDERED_TABLE_ITEM_LIMIT}
					currentPage={currentPage}
					pageNumberMutation={UPDATE_NEEDS_TO_BE_REORDERED_TABLE_PAGE_NUMBER}
					itemsPerPageOptions={[5]}
					modalMutation={UPDATE_MODAL}
					entityType=""
				/>
			)

		}}
	</Query>
)

export default NeedsToBeReorderedContainer