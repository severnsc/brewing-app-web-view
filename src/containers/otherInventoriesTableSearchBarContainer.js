import React from "react"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_OTHER_INVENTORIES_TABLE_FILTER } from "../mutations"

const OtherInventoriesTableSearchBarContainer = () => (
	<SearchBarContainer mutation={UPDATE_OTHER_INVENTORIES_TABLE_FILTER} />
)

export default OtherInventoriesTableSearchBarContainer