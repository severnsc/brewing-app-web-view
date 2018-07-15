import gql from "graphql-tag"

export const currentUserFragments = {
	inventoryItems: gql`
		fragment InventoryItems on User {
			inventories {
        name
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
	`,
	timers: gql`
		fragment Timers on User {
			timers {
        id
        name
        duration
        timerAlerts {
          id
          activationTime
          message
          activated
        }
      }
		}
	`
}