import React from "react"
import PropTypes from "prop-types"
import { Query, Mutation } from "react-apollo"
import {
	CREATE_INVENTORY_ITEM,
	UPDATE_INVENTORY_ITEM,
	UPDATE_MODAL
} from "../mutations"
import { inventoriesQuery, inventoryItemsQuery } from "../queries"
import { YeastForm } from "../components"
import moment from "moment"

const YeastContainer = ({ id, type }) => (
	<Query query={type === "create" ? inventoriesQuery : inventoryItemsQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const createUpdateFunc = (cache, { data: { createInventoryItem } }) => {
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
			}

			const updateUpdateFunc = (cache, { data: { updateInventoryItem } }) => {
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
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(inventory => inventory.name === "Yeast")
			let item = {}
			let parsedObject = {}
			if(type === "update"){
				item = inventory.items.find(item => item.id === id)
				parsedObject = JSON.parse(item.object)
			}

			return(
				<Mutation mutation={UPDATE_MODAL}>
					{updateModal => {

						return(
							<Mutation
								mutation={type === "create" ? CREATE_INVENTORY_ITEM : UPDATE_INVENTORY_ITEM}
								update={type === "create" ? createUpdateFunc : updateUpdateFunc}
							>
								{mutation => {

									const yeastFunc = (yeastName, amount, yeastLab, yeastNumber, yeastType, dryOrLiquid, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold) => {
										const object = JSON.stringify({
											name: yeastName,
											yeastLab,
											yeastNumber,
											yeastType,
											dry: dryOrLiquid === "Dry"
										})
										mutation({
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
												createdAt: item.createdAt || new Date().toString(),
												updatedAt: item.updatedAt || new Date().toString()
											}
										}).then(() => updateModal({ variables: {id: "", type: ""} }))
									}

									const props = {}
									props.onSubmit = yeastFunc
									props.name = parsedObject.name || null
									props.amount = item.currentQuantity || null
									props.lab = parsedObject.yeastLab || null
									props.number = parsedObject.yeastNumber || null
									props.type = parsedObject.yeastType || null
									props.dryOrLiquid = parsedObject.dryOrLiquid || null
									props.unitCost = item.unitCost || null
									props.purchaseDate = item.lastReorderDate ? moment(new Date(item.lastReorderDate)).format("YYYY-MM-DD") : null
									props.deliveryDate = item.deliveryDate ? moment(new Date(item.deliveryDate)).format("YYYY-MM-DD") : null
									props.reorderQuantity = item.reorderQuantity || null
									props.reorderThreshold = item.reorderThreshold || null

									return(
										<YeastForm {...props} />
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

YeastContainer.propTypes = {
	id: PropTypes.string,
	type: PropTypes.oneOf(["create", "update"]).isRequired
}

export default YeastContainer