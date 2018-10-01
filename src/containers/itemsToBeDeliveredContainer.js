import React from "react"
import {
	ScrollableList,
	ItemsToBeDeliveredHeader,
	ItemsToBeDeliveredListItem,
	ItemsToBeDeliveredEmpty
} from "../components"
import { Query } from "react-apollo"
import { inventoryItemsQuery } from "../queries"
import moment from "moment"

const ItemsToBeDeliveredContainer = ({ style }) => (
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
					deliveryDate={moment(new Date(item.deliveryDate)).format("MM/DD/YYYY")}
				/>
			)

			return(
				<ScrollableList
					header={<ItemsToBeDeliveredHeader />}
					data={itemsToBeDelivered}
					renderItem={renderItem}
					emptyListComponent={<ItemsToBeDeliveredEmpty />}
					style={style}
				/>
			)

		}}

	</Query>
)

export default ItemsToBeDeliveredContainer