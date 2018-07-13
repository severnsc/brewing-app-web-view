import gql from "graphql-tag"

export default gql`
	query {
		currentUser {
			inventories {
				id
				name
				items {
					id
				}
			}
		}

		inventoriesTable @client {
			sortBy
      sortOrder
      itemLimit
      filterString
      currentPage
		}
	}
`