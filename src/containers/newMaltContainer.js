import React from "react"
import { Query, Mutation } from "react-apollo"
import { CREATE_INVENTORY_ITEM, UPDATE_MODAL } from "../mutations"
import { inventoriesQuery } from "../queries"
import { NewMaltForm } from "../components"

const NewMaltContainer = () => (
	<Query query={inventoriesQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(inventory => inventory.name === "Malt")

			return(
				<Mutation mutation={UPDATE_MODAL}>
					{updateModal => {

						return(
							<Mutation
								mutation={CREATE_INVENTORY_ITEM}
								update={(cache, { data: { createInventoryItem } }) => {
									const { currentUser } = cache.readQuery({ query: inventoriesQuery })
									const { inventories } = currentUser
									const inventory = inventories.find(inventory => inventory.name === "Malt")
									const newInventory = {
										...inventory,
										items: [...inventory.items, createInventoryItem]
									}
									const data = {
										currentUser: {
											...currentUser,
											inventories: inventories.map(inventory => inventory.name === "Malt" ? newInventory : inventory)
										}
									}
									cache.writeQuery({ query: inventoriesQuery, data })
								}}
							>
								{createInventoryItem => {

									const createMalt = (maltName, amount, maltType, maltColor, countryOfOrigin, unitCost, purchaseDate, reorderQuantity, reorderThreshold) => {
										const object = JSON.stringify({
											name: maltName,
											type: maltType,
											color: maltColor,
											countryOfOrigin,
										})
										createInventoryItem({
											variables: {
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
												createdAt: new Date().toString(),
												updatedAt: new Date().toString()
											}
										}).then(() => updateModal({ variables: {id: "", type: ""} }))
									}

									return(
										<NewMaltForm onSubmit={createMalt} />
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

export default NewMaltContainer