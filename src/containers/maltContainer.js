import React from "react"
import { Query, Mutation } from "react-apollo"
import { UPDATE_INVENTORY_ITEM, UPDATE_MODAL } from "../mutations"
import { inventoryItemsQuery } from "../queries"
import { MaltForm } from "../components"
import moment from "moment"

const MaltContainer = ({ id }) => (
	<Query query={inventoryItemsQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(inventory => inventory.name === "Malt")
			const item = inventory.items.find(item => item.id === id)

			return(
				<Mutation mutation={UPDATE_MODAL}>
					{updateModal => {

						return(
							<Mutation
								mutation={UPDATE_INVENTORY_ITEM}
								update={(cache, { data: { updateInventoryItem } }) => {
									const { currentUser } = cache.readQuery({ query: inventoryItemsQuery })
									const { inventories } = currentUser
									const inventory = inventories.find(inventory => inventory.name === "Malt")
									const items = inventory.items
									const newItems = items.map(item => item.id === id ? updateInventoryItem : item)
									const newInventory = {
										...inventory,
										items: newItems
									}
									const data = {
										currentUser: {
											...currentUser,
											inventories: inventories.map(inventory => inventory.name === "Malt" ? newInventory : inventory)
										}
									}
									cache.writeQuery({ query: inventoryItemsQuery, data })
								}}
							>
								{updateInventoryItem => {

									const updateMalt = (maltName, amount, maltType, maltColor, countryOfOrigin, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold) => {
										const object = JSON.stringify({
											name: maltName,
											type: maltType,
											color: maltColor,
											countryOfOrigin,
										})
										updateInventoryItem({
											variables: {
												id,
												inventoryId: inventory.id,
												object,
												quantityUnit: "lbs",
												currentQuantity: amount,
												reorderQuantity,
												reorderThreshold,
												costUnit: "USD",
												unitCost,
												reorderCost: unitCost * reorderQuantity,
												lastReorderDate: purchaseDate,
												deliveryDate
											}
										}).then(() => updateModal({ variables: {id: "", type: ""} }))
									}

									const { object } = item
									const parsedObject = JSON.parse(object)

									return(
										<MaltForm
											onSubmit={updateMalt}
											name={parsedObject.name}
											type={parsedObject.type}
											color={parseInt(parsedObject.color, 10)}
											countryOfOrigin={parsedObject.countryOfOrigin}
											amount={item.currentQuantity}
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

export default MaltContainer