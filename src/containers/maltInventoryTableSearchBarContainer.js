import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_MALT_TABLE_FILTER } from "../mutations"

const MaltInventoryTableSearchBarContainer = () => (
	<SearchBarContainer mutation={UPDATE_MALT_TABLE_FILTER} />
)

export default MaltInventoryTableSearchBarContainer