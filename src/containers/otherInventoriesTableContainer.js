import React from "react"
import { Query } from "react-apollo"
import { inventoryTableQuery } from "../queries"
import { UPDATE_MODAL } from "../mutations"
import { TableData } from "../components"
import {
	HoverableTableRowContainer,
	SortableTableContainer
} from "./common"

const OtherInventoriesTableContainer = () => (
	<Query query={inventoryTableQuery}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(i => i.name.toLowerCase() === "other")

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
				<SortableTableContainer
					name="other"
					columns={columns}
					itemsPerPageOptions={[5, 10, 25, 50]}
					items={inventory.items}
					map={map}
					sort={sort}
					render={render}
				/>
			)

		}}
	</Query>
)

export default OtherInventoriesTableContainer