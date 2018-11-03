import React from "react"
import { Query } from "react-apollo"
import { yeastInventoryTableQuery } from "../queries"
import SortableTableContainer from "./common/sortableTableContainer"
import {
  UPDATE_YEAST_TABLE_SORT,
  UPDATE_YEAST_TABLE_ITEM_LIMIT,
  UPDATE_YEAST_TABLE_PAGE_NUMBER,
  UPDATE_MODAL
} from "../mutations"
import {
	generateId,
	formatDate
} from "../utils"

const YeastInventoryTableContainer = () => (
	<Query query={yeastInventoryTableQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error!</p>

			const columns = [
				{id: generateId(), name: "Yeast name"},
				{id: generateId(), name: "Amount (vials)"},
				{id: generateId(), name: "Yeast lab"},
				{id: generateId(), name: "Yeast number"},
				{id: generateId(), name: "Yeast type"},
				{id: generateId(), name: "Dry or Liquid"},
				{id: generateId(), name: "Purchase date"}
			]

			const { currentUser, yeastInventoryTable } = data
			const { settings } = currentUser
 			const {
				sortBy,
				sortOrder,
				itemsPerPage,
				currentPage,
				filterString
			} = yeastInventoryTable

			const dateSetting = settings.find(setting => setting.name === "dateFormat")

			const inventory = currentUser.inventories.find(inventory => inventory.name === "Yeast")
			const tableRows = inventory
												? inventory.items.map(item => ({
														id: item.id,
														cells: [
															JSON.parse(item.object).name,
															item.currentQuantity,
															JSON.parse(item.object).yeastLab,
															JSON.parse(item.object).yeastNumber,
															JSON.parse(item.object).yeastType,
															JSON.parse(item.object).dry ? "Dry" : "Liquid",
															formatDate(new Date(item.lastReorderDate), dateSetting.value)
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
          entityType="yeast"
				/>
			)

		}}
	</Query>
)

export default YeastInventoryTableContainer