import React from "react"
import PropTypes from "prop-types"
import { Query, Mutation } from "react-apollo"
import { inventoryItemsQuery } from "../queries"
import { UPDATE_INVENTORY_ITEM } from "../mutations"
import { InventoryItemForm } from "../components"

const InventoryItemFormContainer = ({ id }) => (

	<Query query={inventoryItemsQuery} variables={{ id }}>

		{({loading, error, data}) => {

			if(loading) return "Loading..."
			if(error) return "Error!"

			const inventories = data.currentUser.inventories
			const itemIdMatch = item => item.id === id
			const inventoryItem = inventories.find(inventory => inventory.items.some(itemIdMatch)).items.find(itemIdMatch)

			const {
				inventory,
				object,
				costUnit,
				unitCost,
				reorderCost,
				quantityUnit,
				currentQuantity,
				reorderQuantity,
				reorderThreshold
			} = inventoryItem

			const inventoryId = inventory.id

			const name = JSON.parse(object).name

			const lastReorderDate = new Date(inventoryItem.lastReorderDate)
			const deliveryDate = new Date(inventoryItem.deliveryDate)

			const formatDate = date => date < 10 ? ("0" + date) : date

			const dateToObject = date => {
				const year = date.getFullYear()
				const month = date.getMonth() + 1
				const day = date.getDate()
				return {
					year,
					month,
					day
				}
			}

			const lastReorderDateObject = dateToObject(lastReorderDate)
			const deliveryDateObject = dateToObject(deliveryDate)

			const lastReorderDateString = `${lastReorderDateObject.year}-${formatDate(lastReorderDateObject.month)}-${formatDate(lastReorderDateObject.day)}`
			const deliveryDateString = `${deliveryDateObject.year}-${formatDate(deliveryDateObject.month)}-${formatDate(deliveryDateObject.day)}`

			return(
				<Mutation mutation={UPDATE_INVENTORY_ITEM}>
					{updateInventoryItem => {

						const saveInventoryItem = inventoryItem => {
							const {
								name,
								costUnit,
								unitCost,
								reorderCost,
								quantityUnit,
								currentQuantity,
								reorderQuantity,
								reorderThreshold,
								lastReorderDate,
								deliveryDate
							} = inventoryItem

							const object = JSON.stringify({ name })

							const lastReorderDateString = new Date(lastReorderDate).toUTCString()
							const deliveryDateString = new Date(deliveryDate).toUTCString()

							updateInventoryItem({ variables: {
								id,
								inventoryId,
								object,
								costUnit,
								unitCost,
								reorderCost,
								quantityUnit,
								currentQuantity,
								reorderQuantity,
								reorderThreshold,
								lastReorderDate: lastReorderDateString,
								deliveryDate: deliveryDateString
							}})
						}

						return(
							<InventoryItemForm
								name={name}
								costUnit={costUnit}
								unitCost={unitCost}
								reorderCost={reorderCost}
								quantityUnit={quantityUnit}
								currentQuantity={currentQuantity}
								reorderQuantity={reorderQuantity}
								reorderThreshold={reorderThreshold}
								lastReorderDate={lastReorderDateString}
								deliveryDate={deliveryDateString}
								saveInventoryItem={saveInventoryItem}
							/>
						)

					}}
				</Mutation>
			)

		}}

	</Query>

)

InventoryItemFormContainer.propTypes = {
	id: PropTypes.string.isRequired
}

export default InventoryItemFormContainer