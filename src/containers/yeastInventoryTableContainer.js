import React from "react"
import { Query } from "react-apollo"
import { yeastInventoryTableQuery } from "../queries"
import {
  UPDATE_YEAST_TABLE_SORT,
  UPDATE_YEAST_TABLE_ITEM_LIMIT,
  UPDATE_YEAST_TABLE_PAGE_NUMBER,
  UPDATE_MODAL
} from "../mutations"
import {
	generateId,
	formatDate
} from "../utils"

const YeastInventoryTableContainer = () => (
	<div></div>
)

export default YeastInventoryTableContainer