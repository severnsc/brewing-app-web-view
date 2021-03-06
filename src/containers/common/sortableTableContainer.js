import React from "react"
import PropTypes from "prop-types"
import { Table } from "../../components"
import { Query } from "react-apollo"
import { tableQuery } from "../../queries"

import {
	SortableTableHeaderContainer,
	PaginationContainer
} from "."

import {
	UPDATE_TABLE_SORT,
	UPDATE_TABLE_ITEMS_PER_PAGE,
	UPDATE_TABLE_PAGE_NUMBER
} from "../../mutations"

const SortableTableContainer = ({ name, columns, itemsPerPageOptions, items, map, sort, render }) => (
	<Query query={tableQuery} variables={{ name }}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { table } = data
			const {
				sortBy,
				sortOrder,
				itemsPerPage,
				currentPage,
				filterString
			}	= table
			
			const startIndex = itemsPerPage * (currentPage - 1)
			const endIndex = itemsPerPage * (currentPage)

			const filter = item => item.name.toLowerCase().includes(filterString)
			let tableRows = items.map(map).filter(filter).sort(sort(sortBy))

			const totalPages = Math.ceil(tableRows.length/itemsPerPage)
			
			if(sortOrder === "desc") tableRows = tableRows.reverse()
			tableRows = tableRows.slice(startIndex, endIndex).map(render)

			return(
				<div>
					<Table>
						<SortableTableHeaderContainer
							columns={columns}
							sortBy={sortBy}
							sortOrder={sortOrder}
							toggleSortMutation={UPDATE_TABLE_SORT}
							name={name}
						/>
						<tbody>
							{tableRows}
						</tbody>
					</Table>
					<PaginationContainer
						name={name}
						page={currentPage}
						totalPages={totalPages}
						showPageNumbers={true}
						showItemsPerPage={true}
						itemsPerPageOptions={itemsPerPageOptions}
						itemsPerPage={itemsPerPage}
						pageNumberMutation={UPDATE_TABLE_PAGE_NUMBER}
						itemsPerPageMutation={UPDATE_TABLE_ITEMS_PER_PAGE}
					/>
				</div>
			)

		}}
	</Query>
)

SortableTableContainer.propTypes = {
	name: PropTypes.string.isRequired,
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
	itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
	items: PropTypes.array.isRequired,
	map: PropTypes.func.isRequired,
	sort: PropTypes.func.isRequired,
	render: PropTypes.func.isRequired
}

export default SortableTableContainer