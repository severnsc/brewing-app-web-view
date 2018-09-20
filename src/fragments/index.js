import gql from "graphql-tag"

export const currentUserFragments = {
	inventoryItems: gql`
		fragment InventoryItems on User {
			inventories {
        id
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
        isRunning
        remainingDuration
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