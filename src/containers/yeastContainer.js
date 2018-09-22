import React from "react"
import { Query, Mutation } from "react-apollo"
import { UPDATE_INVENTORY_ITEM, UPDATE_MODAL } from "../mutations"
import { inventoryItemsQuery } from "../queries"
import { YeastForm } from "../components"
import moment from "moment"

const YeastContainer = ({ id }) => (
	<Query query={inventoryItemsQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(inventory => inventory.name === "Yeast")
			const item = inventory.items.find(item => item.id === id)
			const parsedObject = JSON.parse(item.object)

			return(
				<Mutation mutation={UPDATE_MODAL}>
					{updateModal => {

						return(
							<Mutation
								mutation={UPDATE_INVENTORY_ITEM}
								update={(cache, { data: { updateInventoryItem } }) => {
									const { currentUser } = cache.readQuery({ query: inventoryItemsQuery })
									const { inventories } = currentUser
									const inventory = inventories.find(inventory => inventory.name === "Yeast")
									const newItems = inventory.items.map(item => item.id === id ? updateInventoryItem : item)
									const data = {
										currentUser: {
											...currentUser,
											inventories: inventories.map(inventory => inventory.name === "Yeast" ? {...inventory, items: newItems} : inventory)
										}
									}
									cache.writeQuery({ query: inventoryItemsQuery, data })
								}}
							>
								{updateInventoryItem => {

									const updateYeast = (yeastName, amount, yeastLab, yeastNumber, yeastType, dryOrLiquid, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold) => {
										const object = JSON.stringify({
											name: yeastName,
											yeastLab,
											yeastNumber,
											yeastType,
											dry: dryOrLiquid === "Dry"
										})
										updateInventoryItem({
											variables: {
												id,
												inventoryId: inventory.id,
												object,
												quantityUnit: "vials",
												currentQuantity: amount,
												reorderQuantity,
												reorderThreshold,
												costUnit: "USD",
												unitCost,
												reorderCost: unitCost * reorderQuantity,
												lastReorderDate: purchaseDate,
												deliveryDate,
												createdAt: new Date().toString(),
												updatedAt: new Date().toString()
											}
										}).then(() => updateModal({ variables: {id: "", type: ""} }))
									}

									return(
										<YeastForm
											onSubmit={updateYeast}
											name={parsedObject.name}
											amount={item.currentQuantity}
											lab={parsedObject.yeastLab}
											number={parsedObject.yeastNumber}
											type={parsedObject.yeastType}
											dryOrLiquid={parsedObject.dry ? "Dry" : "Liquid"}
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

export default YeastContainer