import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_HOPS_TABLE_FILTER } from "../mutations"

const HopsInventoryTableSearchContainer = () =>
	<SearchBarContainer mutation={UPDATE_HOPS_TABLE_FILTER} />

export default HopsInventoryTableSearchContainer