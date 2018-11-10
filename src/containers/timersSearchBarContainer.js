import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_TABLE_FILTER } from "../mutations"

const TimerSearchBarContainer = () => (
	<SearchBarContainer
		mutation={UPDATE_TABLE_FILTER}
		placeholder="Search for timers by name"
		name="timers"
	/>
)

export default TimerSearchBarContainer