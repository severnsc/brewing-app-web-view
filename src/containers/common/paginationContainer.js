import React from "react"
import PropTypes from "prop-types"
import { Pagination } from "../../components"
import { Mutation } from "react-apollo"

const PaginationContainer = ({
	name,
	page,
	totalPages,
	showPageNumbers,
	showItemsPerPage,
	itemsPerPageOptions,
	itemsPerPage,
	pageNumberMutation,
	itemsPerPageMutation
}) => (
	<Mutation mutation={pageNumberMutation}>
		{pageNumberMutation => {

			return(
				<Mutation mutation={itemsPerPageMutation}>
					{itemsPerPageMutation => {

						const increment = () => {
							pageNumberMutation({ variables: { type: "INCREMENT" } })
						}

						const decrement = () => {
							pageNumberMutation({ variables: { type: "DECREMENT" } })	
						}

						const updatePageNumber = page => {
							pageNumberMutation({ variables: { type: "GOTO", page } })
						}

						const updateItemsPerPage = itemsPerPage => {
							itemsPerPageMutation({ variables: { name, itemsPerPage } })
						}

						return(
							<Pagination
								page={page}
								totalPages={totalPages}
								showPageNumbers={showPageNumbers}
								showItemsPerPage={showItemsPerPage}
								itemsPerPageOptions={itemsPerPageOptions}
								itemsPerPage={itemsPerPage}
								increment={increment}
								decrement={decrement}
								updatePageNumber={updatePageNumber}
								updateItemsPerPage={updateItemsPerPage}
							/>
						)

					}}
				</Mutation>
			)

		}}
	</Mutation>
)

PaginationContainer.propTypes = {
	name: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	showPageNumbers: PropTypes.bool,
	showItemsPerPage: PropTypes.bool,
	itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
	itemsPerPage: PropTypes.number,
	pageNumberMutation: PropTypes.object.isRequired,
	itemsPerPageMutation: PropTypes.object.isRequired
}

export default PaginationContainer