import React from "react"
import { SortableTableHeader } from "../../components"
import { Mutation } from "react-apollo"

const SortableTableHeaderContainer = ({
	columns,
	sortBy,
	sortOrder,
	toggleSortMutation
}) => (
	<Mutation mutation={toggleSortMutation}>
		{mutation => {

			onClick = columnName => {
				toggleSortMutation({variables: { cellName: columnName } })
			}

			return(
				<SortableTableHeader
					columns={columns}
					sortBy={sortBy}
					sortOrder={sortOrder}
					onClick={onClick}
				/>
			)

		}}
	</Mutation>
)

export default SortableTableHeaderContainer