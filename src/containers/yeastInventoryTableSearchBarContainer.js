import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_TABLE_FILTER } from "../mutations"

const YeastInventoryTableSearchBarContainer = () => (
	<SearchBarContainer
		mutation={UPDATE_TABLE_FILTER}
		placeholder="Search for yeast by name"
		name="yeast"
	/>
)

export default YeastInventoryTableSearchBarContainer