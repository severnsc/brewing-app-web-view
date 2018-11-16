import React from "react"
import PropTypes from "prop-types"
import { SortableTableHeader } from "../../components"
import { Mutation } from "react-apollo"

const SortableTableHeaderContainer = ({
	columns,
	sortBy,
	sortOrder,
	name,
	toggleSortMutation
}) => (
	<Mutation mutation={toggleSortMutation}>
		{toggleSortMutation => {

			const onClick = columnName => {
				toggleSortMutation({variables: { name, sortBy: columnName } })
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

SortableTableHeaderContainer.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
	sortBy: PropTypes.string,
	sortOrder: PropTypes.oneOf(["asc", "desc"]),
	name: PropTypes.string.isRequired,
	toggleSortMutation: PropTypes.object.isRequired
}

export default SortableTableHeaderContainer