import React from "react"
import PropTypes from "prop-types"
import { Query, Mutation } from "react-apollo"
import {
	CREATE_INVENTORY_ITEM,
	UPDATE_INVENTORY_ITEM,
	UPDATE_MODAL
} from "../mutations"
import { inventoriesQuery, inventoryItemsQuery } from "../queries"
import { HopsForm } from "../components"
import moment from "moment"

const HopsContainer = ({ id, type }) => (
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
				const inventory = inventories.find(inventory => inventory.name === "Hops")
				const newInventory = {
					...inventory,
					items: [...inventory.items, createInventoryItem]
				}
				const data = {
					currentUser: {
						...currentUser,
						inventories: inventories.map(inventory => inventory.name === "Hops" ? newInventory : inventory)
					}
				}
				cache.writeQuery({ query: inventoriesQuery, data })
			}

			const updateUpdateFunction = (cache, { data: { updateInventoryItem } }) => {
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
			}

			const { inventories } = data.currentUser
			const inventory = inventories.find(inventory => inventory.name === "Hops")
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

									const hopsFunc = (hopName, amount, countryOfOrigin, alphaAcids, unitCost, purchaseDate, deliveryDate, reorderQuantity, reorderThreshold) => {
										const object = JSON.stringify({
											name: hopName,
											alphaAcids,
											countryOfOrigin,
										})
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
									props.onSubmit = hopsFunc
									props.name = parsedObject.name || null
									props.amount = item.currentQuantity || null
									props.alphaAcids = parseInt(parsedObject.alphaAcids, 10) || null
									props.countryOfOrigin = parsedObject.countryOfOrigin || null
									props.unitCost = item.unitCost || null
									props.purchaseDate = item.lastReorderDate ? moment(new Date(item.lastReorderDate)).format("YYYY-MM-DD") : null
									props.deliveryDate = item.deliveryDate ? moment(new Date(item.deliveryDate)).format("YYYY-MM-DD") : null
									props.reorderQuantity = item.reorderQuantity || null
									props.reorderThreshold = item.reorderThreshold || null

									return(
										<HopsForm {...props} />
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

HopsContainer.propTypes = {
	id: PropTypes.string,
	type: PropTypes.oneOf(["create", "update"]).isRequired
}

export default HopsContainer