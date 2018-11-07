import React from "react"
import PropTypes from "prop-types"
import { Mutation } from "react-apollo"
import { HoverableTableRow } from "../../components"

const HoverableTableRowContainer = ({
	modalMutation,
	entityType,
	id,
	children
}) => (
	<Mutation mutation={modalMutation}>
		{mutation => {

			const onClick = id => {
				mutation({ variables: { id, type: entityType } })
			}

			return(
				<HoverableTableRow id={id} onClick={onClick}>
					{children}
				</HoverableTableRow>
			)

		}}
	</Mutation>
)

HoverableTableRowContainer.propTypes = {
	modalMutation: PropTypes.string.isRequired,
	entityType: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.node)
	]).isRequired
}

export default HoverableTableRowContainer