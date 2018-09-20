import React from "react"
import { Query, Mutation } from "react-apollo"
import { CREATE_INVENTORY_ITEM, UPDATE_MODAL } from "../mutations"
import { inventoriesQuery } from "../queries"
import { NewYeastForm } from "../components"

const NewHopsContainer = () => (
	<Query query={inventoriesQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(inventory => inventory.name === "Yeast")

			return(
				<Mutation mutation={UPDATE_MODAL}>
					{updateModal => {

						return(
							<Mutation
								mutation={CREATE_INVENTORY_ITEM}
								update={(cache, { data: { createInventoryItem } }) => {
									const { currentUser } = cache.readQuery({ query: inventoriesQuery })
									const { inventories } = currentUser
									const inventory = inventories.find(inventory => inventory.name === "Yeast")
									const newInventory = {
										...inventory,
										items: [...inventory.items, createInventoryItem]
									}
									const data = {
										currentUser: {
											...currentUser,
											inventories: inventories.map(inventory => inventory.name === "Yeast" ? newInventory : inventory)
										}
									}
									cache.writeQuery({ query: inventoriesQuery, data })
								}}
							>
								{createInventoryItem => {

									const createYeast = (yeastName, amount, yeastLab, yeastNumber, yeastType, dryOrLiquid, unitCost, purchaseDate, reorderQuantity, reorderThreshold) => {
										const object = JSON.stringify({
											name: yeastName,
											yeastLab,
											yeastNumber,
											yeastType,
											dry: dryOrLiquid === "Dry"
										})
										createInventoryItem({
											variables: {
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
												createdAt: new Date().toString(),
												updatedAt: new Date().toString()
											}
										}).then(() => updateModal({ variables: {id: "", type: ""} }))
									}

									return(
										<NewYeastForm onSubmit={createYeast} />
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

export default NewHopsContainer