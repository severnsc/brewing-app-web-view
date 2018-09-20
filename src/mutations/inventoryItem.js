import gql from "graphql-tag"

export const CREATE_INVENTORY_ITEM = gql`
	mutation createInventoryItem($inventoryId: String!, $object: String!, $quantityUnit: String!, $currentQuantity: Float!, $reorderQuantity: Float!, $reorderThreshold: Float!, $costUnit: String!, $unitCost: Float!, $reorderCost: Float!, $lastReorderDate: String, $deliveryDate: String, $createdAt: String!, $updatedAt: String!) {
		createInventoryItem(inventoryId: $inventoryId, object: $object, quantityUnit: $quantityUnit, currentQuantity: $currentQuantity, reorderQuantity: $reorderQuantity, reorderThreshold: $reorderThreshold, costUnit: $costUnit, unitCost: $unitCost, reorderCost: $reorderCost, lastReorderDate: $lastReorderDate, deliveryDate: $deliveryDate, createdAt: $createdAt, updatedAt: $updatedAt) {
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

export const UPDATE_INVENTORY_ITEM = gql`
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