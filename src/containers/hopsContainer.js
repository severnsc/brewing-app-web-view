import React from "react"
import { Query, Mutation } from "react-apollo"
import { UPDATE_INVENTORY_ITEM, UPDATE_MODAL } from "../mutations"
import { inventoryItemsQuery } from "../queries"
import { HopsForm } from "../components"
import moment from "moment"

const HopsContainer = ({ id }) => (
	<Query query={inventoryItemsQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(inventory => inventory.name === "Hops")
			const item = inventory.items.find(item => item.id === id)
			const { object } = item
			const parsedObject = JSON.parse(object)

			return(
				<Mutation mutation={UPDATE_MODAL}>
					{updateModal => {

						return(
							<Mutation
								mutation={UPDATE_INVENTORY_ITEM}
								update={(cache, { data: { updateInventoryItem } }) => {
									const { currentUser } = cache.readQuery({ query: inventoryItemsQuery })
									const { inventories } = currentUser
									const inventory = inventories.find(inventory => inventory.name === "Hops")
									const newItems = inventory.items.map(item => item.id === id ? updateInventoryItem : item)
									const data = {
										currentUser: {
											...currentUser,
											inventories: inventories.map(inventory => inventory.name === "Hops" ? {...inventory, items: newItems} : inventory)
										}
									}
									cache.writeQuery({ query: inventoryItemsQuery, data })
								}}
							>
								{updateInventoryItem => {

									const updateHops = (hopName, amount, countryOfOrigin, alphaAcids, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold) => {
										const object = JSON.stringify({
											name: hopName,
											alphaAcids,
											countryOfOrigin,
										})
										updateInventoryItem({
											variables: {
												id,
												inventoryId: inventory.id,
												object,
												quantityUnit: "oz",
												currentQuantity: amount,
												reorderQuantity,
												reorderThreshold,
												costUnit: "USD",
												unitCost,
												reorderCost: unitCost * reorderQuantity,
												lastReorderDate: purchaseDate,
												deliveryDate,
											}
										}).then(() => updateModal({ variables: {id: "", type: ""} }))
									}

									return(
										<HopsForm
											onSubmit={updateHops}
											name={parsedObject.name}
											amount={item.currentQuantity}
											alphaAcids={parseInt(parsedObject.alphaAcids, 10)}
											countryOfOrigin={parsedObject.countryOfOrigin}
											unitCost={item.unitCost}
											purchaseDate={item.lastReorderDate && moment(new Date(item.lastReorderDate)).format("YYYY-MM-DD")}
											deliveryDate={item.deliveryDate && moment(new Date(item.deliveryDate)).format("YYYY-MM-DD")}
											reorderQuantity={item.reorderQuantity}
											reorderThreshold={item.reorderThreshold}
										/>
									)

								}}
							</Mutation>
						)

					}}
				</Mutation>
				
			)

		}}
	</Query>
)

export default HopsContainer