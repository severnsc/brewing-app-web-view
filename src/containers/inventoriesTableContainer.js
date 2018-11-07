import React from "react"
import SortableTableContainer from "./common/sortableTableContainer"
import { Query } from "react-apollo"
import { inventoriesTableQuery } from "../queries"
import shortid from "shortid"
import {
	UPDATE_MODAL,
	UPDATE_INVENTORIES_TABLE_SORT,
	UPDATE_INVENTORIES_TABLE_ITEM_LIMIT,
	UPDATE_INVENTORIES_TABLE_PAGE_NUMBER
} from "../mutations"

const InventoriesTableContainer = () => (
	<div></div>
)

export default InventoriesTableContainer