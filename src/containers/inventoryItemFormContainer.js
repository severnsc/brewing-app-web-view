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
				reorderThreshold,
				lastReorderDate,
				deliveryDate
			} = data.inventoryItem

			return(
				<InventoryItemForm
					costUnit={costUnit}
					unitCost={unitCost}
					reorderCost={reorderCost}
					quantityUnit={quantityUnit}
					currentQuantity={currentQuantity}
					reorderQuantity={reorderQuantity}
					reorderThreshold={reorderThreshold}
					lastReorderDate={lastReorderDate}
					deliveryDate={deliveryDate}
				/>
			)

		}}

	</Query>

)

InventoryItemFormContainer.propTypes = {
	id: PropTypes.string.isRequired
}

export default InventoryItemFormContainer