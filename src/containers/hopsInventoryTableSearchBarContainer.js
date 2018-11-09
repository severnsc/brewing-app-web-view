import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_TABLE_FILTER } from "../mutations"

const HopsInventoryTableSearchContainer = () =>
	<SearchBarContainer
		mutation={UPDATE_TABLE_FILTER}
		placeholder="Search by hop name"
		name="hops"
	/>

export default HopsInventoryTableSearchContainer