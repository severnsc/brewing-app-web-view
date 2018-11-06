import React from "react"
import { Pagination } from "../../components"
import { Mutation } from "react-apollo"

const PaginationContainer = ({
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

						const updateItemsPerPage = value => {
							itemsPerPageMutation({ variables: { value } })
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