import React from "react"
import PropTypes from "prop-types"
import { Query, Mutation } from "react-apollo"
import {
	CREATE_INVENTORY_ITEM,
	UPDATE_INVENTORY_ITEM,
	UPDATE_MODAL
} from "../mutations"
import { inventoriesQuery, inventoryItemsQuery } from "../queries"
import {
	HopsForm,
	MaltForm,
	YeastForm,
	OtherForm
} from "../components"
import moment from "moment"

const InventoryItemContainer = ({ id, type, inventoryType }) => (
	<Query query={type === "create" ? inventoriesQuery : inventoryItemsQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const createUpdateFunction = (cache, { data: { createInventoryItem } }) => {
				const { currentUser } = cache.readQuery({ query: inventoriesQuery })
				const { inventories } = currentUser
				const inventory = inventories.find(inventory => inventory.name === inventoryType)
				const newInventory = {
					...inventory,
					items: [...inventory.items, createInventoryItem]
				}
				const data = {
					currentUser: {
						...currentUser,
						inventories: inventories.map(inventory => inventory.name === inventoryType ? newInventory : inventory)
					}
				}
				cache.writeQuery({ query: inventoriesQuery, data })
			}

			const updateUpdateFunction = (cache, { data: { updateInventoryItem } }) => {
				const { currentUser } = cache.readQuery({ query: inventoryItemsQuery })
				const { inventories } = currentUser
				const inventory = inventories.find(inventory => inventory.name === inventoryType)
				const newItems = inventory.items.map(item => item.id === id ? updateInventoryItem : item)
				const data = {
					currentUser: {
						...currentUser,
						inventories: inventories.map(inventory => inventory.name === inventoryType ? {...inventory, items: newItems} : inventory)
					}
				}
				cache.writeQuery({ query: inventoryItemsQuery, data })
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(inventory => inventory.name === inventoryType)
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
								update={type === "create" ? createUpdateFunction : updateUpdateFunction}
							>
								{mutation => {

									const itemFunc = (amount, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold, ...rest) => {
										let object
										switch(inventoryType) {
											case "Hops":
												object = JSON.stringify({
																name: rest[0],
																alphaAcids: rest[1],
																countryOfOrigin: rest[2],
															})
												break

											case "Malt":
												object = JSON.stringify({
																name: rest[0],
																type: rest[1],
																color: rest[2],
																countryOfOrigin: rest[3],
															})
												break

											case "Yeast":
												object = JSON.stringify({
																name: rest[0],
																yeastLab: rest[1],
																yeastNumber: rest[2],
																yeastType: rest[3],
																dry: rest[4] === "Dry"
															})
												break

											default:
												object = JSON.stringify({name: rest[0]})
										}
										
										mutation({
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
												createdAt: item.createdAt || new Date().toString(),
												updatedAt: item.updatedAt || new Date().toString() 
											}
										}).then(() => updateModal({ variables: {id: "", type: ""} }))
									}

									const props = {}
									props.onSubmit = itemFunc
									props.name = parsedObject.name || null
									props.amount = item.currentQuantity || null
									props.color = parsedObject.color || null
									props.type = parsedObject.type || parsedObject.yeastType || null
									props.alphaAcids = parseInt(parsedObject.alphaAcids, 10) || null
									props.countryOfOrigin = parsedObject.countryOfOrigin || null
									props.yeastLab = parsedObject.yeastLab || null
									props.yeastNumber = parsedObject.yeastNumber || null
									props.dryOrLiquid = parsedObject.dry ? "Dry" : "Liquid"
									props.unitCost = item.unitCost || null
									props.purchaseDate = item.lastReorderDate ? moment(new Date(item.lastReorderDate)).format("YYYY-MM-DD") : null
									props.deliveryDate = item.deliveryDate ? moment(new Date(item.deliveryDate)).format("YYYY-MM-DD") : null
									props.reorderQuantity = item.reorderQuantity || null
									props.reorderThreshold = item.reorderThreshold || null

									switch(inventoryType){
										case "Hops":
											return <HopsForm {...props} />

										case "Malt":
											return <MaltForm {...props} />

										case "Yeast":
											return <YeastForm {...props} />

										default:
											return <OtherForm {...props} />
									}

								}}
							</Mutation>
						)

					}}
				</Mutation>
				
			)

		}}
	</Query>
)

InventoryItemContainer.propTypes = {
	id: PropTypes.string,
	type: PropTypes.oneOf(["create", "update"]).isRequired,
	inventoryType: PropTypes.oneOf(["Hops", "Malt", "Yeast", "Other"]).isRequired
}

export default InventoryItemContainer