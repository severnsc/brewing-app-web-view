import React from "react"
import { Query } from "react-apollo"
import { timersTableQuery } from "../queries"
import shortid from 'shortid'
import {
	UPDATE_TIMERS_TABLE_SORT,
	UPDATE_TIMERS_TABLE_ITEM_LIMIT,
	UPDATE_TIMERS_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"
import { convertMsToMinutesSecondsString } from "../utils"

const TimersTableContainer = () => {

	const columns = [
    {id: shortid.generate(), name: "Timer name"},
    {id: shortid.generate(), name: "Total duration (HH:MM:SS)"},
    {id: shortid.generate(), name: "Number of alerts"}
  ]

	return(
		<div></div>	
	)

}

export default TimersTableContainer