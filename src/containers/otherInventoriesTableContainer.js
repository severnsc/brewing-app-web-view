import React from "react"
import { Query } from "react-apollo"
import { otherInventoriesTableQuery } from "../queries"
import shortid from "shortid"
import SortableTableContainer from "./common/sortableTableContainer"
import {
  UPDATE_OTHER_INVENTORIES_TABLE_SORT,
  UPDATE_OTHER_INVENTORIES_TABLE_ITEM_LIMIT,
  UPDATE_OTHER_INVENTORIES_TABLE_PAGE_NUMBER,
  UPDATE_MODAL
} from "../mutations"

const OtherInventoriesTableContainer = () => (
	<Query query={otherInventoriesTableQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error!</p>

			const columns = [
				{id: shortid.generate(), name: "Item name"},
				{id: shortid.generate(), name: "Amount"},
			]

			const { currentUser, otherInventoriesTable } = data
			const {
				sortBy,
				sortOrder,
				itemsPerPage,
				currentPage,
				filterString
			} = otherInventoriesTable

			const inventories = currentUser.inventories.filter(inventory => !["Malt", "Hops", "Yeast"].includes(inventory.name))
			const itemsArray = inventories.map(inventory => inventory.items)
			const items = [].concat.apply([], itemsArray)
			const tableRows = items.map(item => ({
				id: item.id,
				cells: [JSON.parse(item.object).name, item.currentQuantity]
			}))
			let filteredTableRows
			if(filterString){
				filteredTableRows = tableRows.filter(tableRow => {
					return tableRow.cells.find(cell => cell.toString().toLowerCase().includes(filterString))
				})
			}

			return(
				<SortableTableContainer
					sortOrderMutation={UPDATE_OTHER_INVENTORIES_TABLE_SORT}
          columns={columns}
          tableRows={filteredTableRows || tableRows}
          sortBy={sortBy}
          sortOrder={sortOrder}
          itemsPerPageOptions={[5, 25,50,100]}
          itemsPerPage={itemsPerPage}
          itemsPerPageMutation={UPDATE_OTHER_INVENTORIES_TABLE_ITEM_LIMIT}
          currentPage={currentPage}
          pageNumberMutation={UPDATE_OTHER_INVENTORIES_TABLE_PAGE_NUMBER}
          modalMutation={UPDATE_MODAL}
          entityType="misc"
				/>
			)

		}}
	</Query>
)

export default OtherInventoriesTableContainer