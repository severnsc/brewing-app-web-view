import React from "react"
import PropTypes from "prop-types"
import { InventoryForm } from "../components"
import { Query, Mutation } from "react-apollo"
import { inventoriesQuery } from "../queries"
import { UPDATE_INVENTORY } from "../mutations"

const InventoryFormContainer = ({ id }) => (
	<Query query={inventoriesQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error!</p>

			const inventories = data.currentUser.inventories
			const inventory = inventories.find(inventory => inventory.id === id)
			const name = inventory.name

			return(
				<Mutation mutation={UPDATE_INVENTORY}>
					{updateInventoryMutation => {

						const save = name => {
							updateInventoryMutation({ variables: {id, name} })
						}

						return(
							<InventoryForm name={name} save={save} />
						)

					}}
				</Mutation>
			)

		}}
	</Query>
)

InventoryFormContainer.propTypes = {
	id: PropTypes.string.isRequired
}

export default InventoryFormContainer