import React from "react"
import PropTypes from "prop-types"
import { Table } from "../../components"
import { Query } from "react-apollo"
import { inventoryTableQuery } from "../../queries"

import {
	SortableTableHeaderContainer,
	PaginationContainer
} from "."

import {
	UPDATE_TABLE_SORT,
	UPDATE_TABLE_ITEMS_PER_PAGE,
	UPDATE_TABLE_PAGE_NUMBER
} from "../../mutations"

const InventoryTableContainer = ({ name, columns, itemsPerPageOptions, map, sort, render }) => (
	<Query query={inventoryTableQuery} variables={{ name }}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { currentUser, table } = data
			const {
				sortBy,
				sortOrder,
				itemsPerPage,
				currentPage,
				filterString
			}	= table

			const inventory = currentUser.inventories.find(inventory =>
				inventory.name.toLowerCase() === name.toLowerCase()
			)

			const totalPages = Math.ceil(inventory.items.length/itemsPerPage)
			
			const startIndex = itemsPerPage * (currentPage - 1)
			const endIndex = itemsPerPage * (currentPage)

			let tableRows = (
				inventory
				? inventory.items.map(map)
					.filter(item => item.name.toLowerCase().includes(filterString))
					.sort(sort(sortBy))
					.slice(startIndex, endIndex)
					.map(render)
				: []
			)

			if(sortOrder === "desc") tableRows = tableRows.reverse()

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

InventoryTableContainer.propTypes = {
	name: PropTypes.string.isRequired,
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
	itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
	map: PropTypes.func.isRequired,
	sort: PropTypes.func.isRequired,
	render: PropTypes.func.isRequired
}

export default InventoryTableContainer