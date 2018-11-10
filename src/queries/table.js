import gql from "graphql-tag"

export default gql`
	query {
		table(name: $name) @client {
			name
			sortBy
			sortOrder
			itemsPerPage
			currentPage
			filterString
		}
	}
`