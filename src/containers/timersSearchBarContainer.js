import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_TIMERS_TABLE_FILTER } from "../mutations"

const TimerSearchBarContainer = () => (
	<SearchBarContainer mutation={UPDATE_TIMERS_TABLE_FILTER} />
)

export default TimerSearchBarContainer