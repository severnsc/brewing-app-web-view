import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_TABLE_FILTER } from "../mutations"

const OtherInventoriesTableSearchBarContainer = () => (
	<SearchBarContainer
		mutation={UPDATE_TABLE_FILTER}
		placeholder="Search for other items by name"
		name="other"
	/>
)

export default OtherInventoriesTableSearchBarContainer