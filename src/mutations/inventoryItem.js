import gql from "graphql-tag"

export default gql`
  mutation updateInventoryItem($id: String!, $inventoryId: String!, $object: String!, $costUnit: String!, $unitCost: Float!, $reorderCost: Float!, $quantityUnit: String!, $currentQuantity: Float!, $reorderQuantity: Float!, $reorderThreshold: Float!, $lastReorderDate: String!, $deliveryDate: String!) {
    updateInventoryItem(id: $id, inventoryId: $inventoryId, object: $object, costUnit: $costUnit, unitCost: $unitCost, reorderCost: $reorderCost, quantityUnit: $quantityUnit, currentQuantity: $currentQuantity, reorderQuantity: $reorderQuantity, reorderThreshold: $reorderThreshold, lastReorderDate: $lastReorderDate, deliveryDate: $deliveryDate) {
      id
			inventory {
				id
			}
			object
			costUnit
			unitCost
			reorderCost
			quantityUnit
			currentQuantity
			reorderQuantity
			reorderThreshold
			lastReorderDate
			deliveryDate
    }
  }
`