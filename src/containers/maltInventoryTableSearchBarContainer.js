import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_TABLE_FILTER } from "../mutations"

const MaltInventoryTableSearchBarContainer = () => (
	<SearchBarContainer
		mutation={UPDATE_TABLE_FILTER}
		placeholder="Search by malt name"
		name="malt"
	/>
)

export default MaltInventoryTableSearchBarContainer