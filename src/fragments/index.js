import gql from "graphql-tag"

export const currentUserFragments = {
	inventoryItems: gql`
		fragment InventoryItems on User {
			inventories {
				items {
					id
					inventory {
						id
					}
          object
          quantityUnit
          currentQuantity
          reorderQuantity
          reorderThreshold
          costUnit
          unitCost
          reorderCost
          lastReorderDate
          deliveryDate
				}
			}
		}
	`
}