import React from "react"
import PropTypes from "prop-types"
import { Query, Mutation } from "react-apollo"
import { inventoryItemQuery } from "../queries"
import InventoryItemForm from "../components/inventoryItemForm"

const InventoryItemFormContainer = ({ id }) => (

	<Query query={inventoryItemQuery} variables={{ id }}>

		{({loading, error, data}) => {

			if(loading) return "Loading..."
			if(error) return "Error!"

			const {
				costUnit,
				unitCost,
				reorderCost,
				quantityUnit,
				currentQuantity,
				reorderQuantity,
				reorderThreshold
			} = data.inventoryItem

			const lastReorderDate = new Date(data.inventoryItem.lastReorderDate)
			const deliveryDate = new Date(data.inventoryItem.deliveryDate)

			const formatDate = date => date < 10 ? ("0" + date) : date

			const lastReorderDateMonth = lastReorderDate.getMonth() + 1
			const lastReorderDateDay = lastReorderDate.getDate()

			const deliveryDateMonth = deliveryDate.getMonth() + 1
			const deliveryDateDay = deliveryDate.getDate()

			const lastReorderDateString = `${lastReorderDate.getFullYear()}-${formatDate(lastReorderDateMonth)}-${formatDate(lastReorderDateDay)}`
			const deliveryDateString = `${deliveryDate.getFullYear()}-${formatDate(deliveryDateMonth)}-${formatDate(deliveryDateDay)}`

			return(
				<InventoryItemForm
					costUnit={costUnit}
					unitCost={unitCost}
					reorderCost={reorderCost}
					quantityUnit={quantityUnit}
					currentQuantity={currentQuantity}
					reorderQuantity={reorderQuantity}
					reorderThreshold={reorderThreshold}
					lastReorderDate={lastReorderDateString}
					deliveryDate={deliveryDateString}
				/>
			)

		}}

	</Query>

)

InventoryItemFormContainer.propTypes = {
	id: PropTypes.string.isRequired
}

export default InventoryItemFormContainer