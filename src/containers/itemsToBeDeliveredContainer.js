import React from "react"
import {
	ScrollableList,
	ItemsToBeDeliveredHeader,
	ItemsToBeDeliveredListItem
} from "../components"
import { Query } from "react-apollo"
import { inventoryItemsQuery } from "../queries"

const ItemsToBeDeliveredContainer = () => (
	<Query query={inventoryItemsQuery}>

		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { currentUser } = data
			const { inventories } = currentUser
			const allItems = inventories.map(inventory => inventory.items).flat()
			const itemsToBeDelivered = allItems.filter(item => 
				item.deliveryDate >= new Date().setHours(0, 0, 0, 0)
			)

			const renderItem = item => (
				<ItemsToBeDeliveredListItem
					key={item.id}
					name={JSON.parse(item.object).name}
					amountOrdered={item.reorderQuantity}
					currentQuantity={item.currentQuantity}
					deliveryDate={item.deliveryDate}
				/>
			)

			return(
				<ScrollableList
					header={<ItemsToBeDeliveredHeader />}
					data={itemsToBeDelivered}
					renderItem={renderItem}
				/>
			)

		}}

	</Query>
)