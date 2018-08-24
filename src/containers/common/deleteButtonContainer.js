import React from "react"
import PropTypes from "prop-types"
import { Mutation } from "react-apollo"

const DeleteButtonContainer = ({ id, mutation, refetchQuery }) => (
	<Mutation mutation={mutation} refetchQueries={[{query: refetchQuery}]}>
		{mutation => {

			const deleteItem = () => {
				mutation({ variables: { id } })
			}

			return(
				<button onClick={deleteItem}>Delete</button>
			)

		}}
	</Mutation>
)

DeleteButtonContainer.propTypes = {
	id: PropTypes.string.isRequired,
	mutation: PropTypes.object.isRequired,
	refetchQuery: PropTypes.object.isRequired
}

export default DeleteButtonContainer