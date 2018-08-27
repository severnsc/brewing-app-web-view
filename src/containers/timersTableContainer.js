import React from "react"
import { Query } from "react-apollo"
import { timersTableQuery } from "../queries"
import shortid from 'shortid'
import SortableTableContainer from './common/sortableTableContainer'
import {
	UPDATE_TIMERS_TABLE_SORT,
	UPDATE_TIMERS_TABLE_ITEM_LIMIT,
	UPDATE_TIMERS_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"

const TimersTableContainer = () => {

	const columns = [
    {id: shortid.generate(), name: "Timer name"},
    {id: shortid.generate(), name: "Total duration"},
    {id: shortid.generate(), name: "Number of alerts"}
  ]

	return(
		<Query query={timersTableQuery}>
			{({ loading, error, data }) => {

				if(loading) return <p>Loading...</p>
        if(error) {
        	console.error(error)
        	return <p>Error</p>
        }

        const tableRows = data.currentUser.timers.map(timer => {
        	const cells = [
        		timer.name,
        		timer.duration,
        		timer.timerAlerts.length
        	]
        	return {id: timer.id, cells}
        })

				const {
					sortBy,
					sortOrder,
					itemLimit,
					currentPage,
					filterString
				} = data.timersTable

				let filteredTableRows
				if(filterString !== ""){
					filteredTableRows = tableRows.filter(tableRow => {
						return tableRow.cells.find(cell => cell.toString().toLowerCase().includes(filterString))
					})
				}

				return(
					<SortableTableContainer
						sortOrderMutation={UPDATE_TIMERS_TABLE_SORT}
			      columns={columns}
			      tableRows={filteredTableRows || tableRows}
			      sortBy={sortBy}
			      sortOrder={sortOrder}
			      itemsPerPageOptions={[25,50,100]}
			      itemsPerPage={itemLimit}
			      itemsPerPageMutation={UPDATE_TIMERS_TABLE_ITEM_LIMIT}
			      currentPage={currentPage}
			      pageNumberMutation={UPDATE_TIMERS_TABLE_PAGE_NUMBER}
			      modalMutation={UPDATE_MODAL}
			      entityType="timer"
					/>
				)

			}}
		</Query>	
	)

}

export default TimersTableContainer