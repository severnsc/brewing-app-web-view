import React from "react"
import { Query } from "react-apollo"
import { maltInventoryTableQuery } from "../queries"
import {
	Currency,
	Weight,
	ConvertWeight,
	MaltColor,
	ConvertMaltColor
} from "../components"
import ConvertCurrencyContainer from "./common/convertCurrencyContainer"
import {
	UPDATE_MALT_TABLE_SORT,
	UPDATE_MALT_TABLE_ITEM_LIMIT,
	UPDATE_MALT_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"
import { weightUnits, formatDate, generateId } from "../utils"

const MaltInventoryTableContainer = () => (
	<div></div>
)

export default MaltInventoryTableContainer