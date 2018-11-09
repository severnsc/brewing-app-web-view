import React from "react"
import { UPDATE_MODAL } from "../mutations"
import { TableData } from "../components"
import {
	HoverableTableRowContainer,
	InventoryTableContainer
} from "./common"

const OtherInventoriesTableContainer = () => {

	const columns = [
		"Item name",
		"Amount"
	]

	const map = item => ({
		id: item.id,
		name: JSON.parse(item.object).name,
		currentQuantity: item.currentQuantity,
		quantityUnit: item.quantityUnit
	})

	const sort = sortBy => 
		(a, b) => {

			let sortKey
			switch(sortBy){
				
				case "Amount":
					sortKey = "currentQuantity"
					break

				default:
					sortKey = "name"
			}

			if(a[sortKey] < b[sortKey]){
				return -1
			}

			if(a[sortKey] > b[sortKey]){
				return 1
			}

			return 0
		}

	const render = item => (
		<HoverableTableRowContainer
			key={item.id}
			modalMutation={UPDATE_MODAL}
			entityType="other"
			id={item.id}
		>
			<TableData value={item.name} />
			<TableData value={item.currentQuantity} />
		</HoverableTableRowContainer>
	)
	
	return(
		<InventoryTableContainer
			name="other"
			columns={columns}
			itemsPerPageOptions={[5, 10, 25, 50]}
			map={map}
			sort={sort}
			render={render}
		/>
	)
}

export default OtherInventoriesTableContainer