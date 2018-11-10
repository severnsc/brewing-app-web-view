import React from "react"
import { Query } from "react-apollo"
import { timersQuery } from "../queries"
import { convertMsToMinutesSecondsString } from "../utils"
import { TableData } from "../components"
import { UPDATE_MODAL } from "../mutations"
import {
	HoverableTableRowContainer,
	SortableTableContainer
} from "./common"

const TimersTableContainer = () => (
	<Query query={timersQuery}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { timers } = data.currentUser

			const columns = [
		    "Timer name",
		    "Total duration (HH:MM:SS)",
		    "Number of alerts"
		  ]

		 	const map = timer => ({
		 		id: timer.id,
		 		name: timer.name,
		 		duration: convertMsToMinutesSecondsString(timer.duration),
		 		alertCount: timer.timerAlerts.length
		 	})

		 	const sort = sortBy => 
		 		(a,b) => {

		 			let sortKey

		 			switch(sortBy){
		 				
		 				case columns[1]:
		 					sortKey = "duration"
		 					break

		 				case columns[2]:
		 					sortKey = "alertCount"
		 					break

		 				default:
		 					sortKey = "name"

		 			}

		 			if(a[sortKey] > b[sortKey]){
		 				return 1
		 			}

		 			if(a[sortKey] < b[sortKey]){
		 				return -1
		 			}

		 			return 0

		 		}

		 	const render = timer => (
		 		<HoverableTableRowContainer
		 			key={timer.id}
		 			modalMutation={UPDATE_MODAL}
					entityType="timer"
					id={timer.id}
		 		>
		 			<TableData value={timer.name} />
		 			<TableData value={timer.duration} />
		 			<TableData value={timer.alertCount} />
		 		</HoverableTableRowContainer>
		 	)

			return(
				<SortableTableContainer
					name="timers"
					columns={columns}
					itemsPerPageOptions={[5, 10, 25, 50]}
					items={timers}
					map={map}
					sort={sort}
					render={render}
				/>
			)

		}}
	</Query>
)

export default TimersTableContainer