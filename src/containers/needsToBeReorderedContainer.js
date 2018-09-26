import React from "react"
import { Query } from "react-apollo"
import { inventoryItemsQuery } from "../queries"
import { ScrollableList } from "../components"
import shortid from "shortid"

const NeedsToBeReorderedContainer = () => (
	<Query query={inventoryItemsQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { currentUser } = data
			const items = currentUser.inventories.map(inventory => inventory.items).flat()
			const itemsToReorder = items.filter(item => item.currentQuantity <= item.reorderThreshold)
			const dataItems = itemsToReorder.map(item => ({
				key: shortid.generate(),
				name: JSON.parse(item.object).name,
				amount: item.currentQuantity
			}))

			const header = (
				<div>
					<span>Item name</span>
					<span>Amount</span>
				</div>
			)

			const renderItem = item => (
				<div>
					<span>{item.name}</span>
					<span>{item.amount}</span>
				</div>
			)

			return(
				<ScrollableList
					header={header}
					data={dataItems}
					renderItem={renderItem}
				/>
			)

		}}
	</Query>
)

export default NeedsToBeReorderedContainer