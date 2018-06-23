import gql from "graphql-tag"

export const currentUserFragments = {
	inventoryItems: gql`
		fragment InventoryItems on User {
			inventories {
				items {
					id
          object
          quantityUnit
          currentQuantity
          reorderThreshold
          costUnit
          unitCost
          reorderCost
				}
			}
		}
	`
}