import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_YEAST_TABLE_FILTER } from "../mutations"

const YeastInventoryTableSearchBarContainer = () => (
	<SearchBarContainer mutation={UPDATE_YEAST_TABLE_FILTER} />
)

export default YeastInventoryTableSearchBarContainer