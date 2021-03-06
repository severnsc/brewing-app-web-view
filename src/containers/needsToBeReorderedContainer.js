import React from "react"
import PropTypes from "prop-types"
import { Query } from "react-apollo"
import { inventoryItemsQuery } from "../queries"
import {
	ScrollableList,
	NeedsToBeReorderedHeader,
	NeedsToBeReorderedListItem,
	NeedsToBeReorderedFooter
} from "../components"
import shortid from "shortid"

const NeedsToBeReorderedContainer = ({ style }) => (
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
				amount: item.currentQuantity,
				reorderQuantity: item.reorderQuantity,
				reorderCost: item.reorderCost
			}))

			const totalReorderCost = itemsToReorder.reduce((acc, cv) => acc + cv.reorderCost, 0)

			const renderItem = item => (
				<NeedsToBeReorderedListItem
					key={item.key}
					name={item.name}
					amount={item.amount}
					reorderQuantity={item.reorderQuantity}
					reorderCost={item.reorderCost}
				/>
			)

			return(
				<ScrollableList
					header={<NeedsToBeReorderedHeader />}
					data={dataItems}
					renderItem={renderItem}
					footer={<NeedsToBeReorderedFooter totalReorderCost={totalReorderCost} />}
					style={style}
				/>
			)

		}}
	</Query>
)

NeedsToBeReorderedContainer.propTypes = {
	style: PropTypes.object
}

export default NeedsToBeReorderedContainer