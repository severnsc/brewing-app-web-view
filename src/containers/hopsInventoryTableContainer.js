import React from "react"
import {
	ConvertWeight,
	Weight,
	Currency
} from "../components"
import { Query } from "react-apollo"
import { hopsInventoryTableQuery } from "../queries"
import shortid from "shortid"
import SortableTableContainer from "./common/sortableTableContainer"
import ConvertCurrencyContainer from "./common/convertCurrencyContainer"
import {
	UPDATE_HOPS_TABLE_SORT,
	UPDATE_HOPS_TABLE_ITEM_LIMIT,
	UPDATE_HOPS_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"
import moment from "moment"
import { weightUnits } from "../utils"

const HopsInventoryTableContainer = () => (
	<Query query={hopsInventoryTableQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error!</p>

			const { currentUser, hopsInventoryTable } = data
			const { settings } = currentUser
			const {
				sortBy,
				sortOrder,
				itemsPerPage,
				currentPage,
				filterString
			}	= hopsInventoryTable

			const weightSetting = settings.find(setting => setting.name === "weight")
			const currencySetting = settings.find(setting => setting.name === "currency")

			const columns = [
				{id: shortid.generate(), name: "Hop name"},
				{id: shortid.generate(), name: `Amount ${weightUnits(weightSetting.value)}`},
				{id: shortid.generate(), name: "Country of origin"},
				{id: shortid.generate(), name: "Alpha acid %"},
				{id: shortid.generate(), name: "Cost per lb"},
				{id: shortid.generate(), name: "Purchase date"}
			]

			const inventory = currentUser.inventories.find(inventory => inventory.name === "Hops")
			const tableRows = inventory
												? inventory.items.map(item => ({
														id: item.id,
														cells: [
															JSON.parse(item.object).name,
															item.quantityUnit !== weightSetting.value ? <ConvertWeight from={item.quantityUnit} to={weightSetting.value} amount={item.currentQuantity} /> : <Weight amount={item.currentQuantity} unit={weightSetting.value} />,
															JSON.parse(item.object).countryOfOrigin,
															JSON.parse(item.object).alphaAcids + "%",
															item.costUnit !== currencySetting.value ? <ConvertCurrencyContainer from={item.costUnit} to={currencySetting.value} amount={item.unitCost} /> : <Currency unit={currencySetting.value} amount={item.unitCost} />,
															moment(new Date(item.lastReorderDate)).format("MM/DD/YY")
														]
													}))
												: []

			let filteredRows
			if(filterString){
				filteredRows = tableRows.filter(tableRow => {
					return tableRow.cells.find(cell => cell.toString().toLowerCase().includes(filterString))
				})
			}

			const amountSort = (tableRows, order, sortIndex) => {
				return tableRows.concat().sort((a, b) => {
					const aLbs = parseInt(a.cells[sortIndex].split(" ")[0], 10)
					const aOz = parseInt(a.cells[sortIndex].split(" ")[2], 10)
					const aValue = aLbs + (aOz/16)

					const bLbs = parseInt(b.cells[sortIndex].split(" ")[0], 10)
					const bOz = parseInt(b.cells[sortIndex].split(" ")[2], 10)
					const bValue = bLbs + (bOz/16)
					
					if(order === "asc"){
	          if(aValue < bValue){
	            return -1
	          }

	          if(aValue > bValue){
	            return 1
	          }

	          return 0
	        }else{
	          if(aValue < bValue){
	            return 1
	          }

	          if(aValue > bValue){
	            return -1
	          }

	          return 0
	        }
				})
			}

			const alphaAcidSort = (tableRows, order, sortIndex) => {
				return tableRows.concat().sort((a, b) => {
					const aValue = parseInt(a.cells[sortIndex].split("%")[0], 10)
					const bValue = parseInt(b.cells[sortIndex].split("%")[0], 10)

					if(order === "asc"){
	          if(aValue < bValue){
	            return -1
	          }

	          if(aValue > bValue){
	            return 1
	          }

	          return 0
	        }else{
	          if(aValue < bValue){
	            return 1
	          }

	          if(aValue > bValue){
	            return -1
	          }

	          return 0
	        }
				})
			}

			const costSort = (tableRows, order, sortIndex) => {
				return tableRows.concat().sort((a, b) => {
					const aValue = parseInt(a.cells[sortIndex].split("$")[1], 10)
					const bValue = parseInt(b.cells[sortIndex].split("$")[1], 10)

					if(order === "asc"){
	          if(aValue < bValue){
	            return -1
	          }

	          if(aValue > bValue){
	            return 1
	          }

	          return 0
	        }else{
	          if(aValue < bValue){
	            return 1
	          }

	          if(aValue > bValue){
	            return -1
	          }

	          return 0
	        }
				})
			}

			const customSort = {
				"Amount (lbs, oz)": amountSort,
				"Alpha acid %": alphaAcidSort,
				"Cost per lb": costSort
			}

			return(
				<SortableTableContainer
					sortOrderMutation={UPDATE_HOPS_TABLE_SORT}
					columns={columns}
					tableRows={filteredRows || tableRows}
					sortBy={sortBy}
					sortOrder={sortOrder}
					itemsPerPageOptions={[5,25,50,100]}
					itemsPerPage={itemsPerPage}
					itemsPerPageMutation={UPDATE_HOPS_TABLE_ITEM_LIMIT}
					currentPage={currentPage}
					pageNumberMutation={UPDATE_HOPS_TABLE_PAGE_NUMBER}
					modalMutation={UPDATE_MODAL}
					entityType="hops"
					customSort={customSort}
				/>
			)

		}}
	</Query>
)

export default HopsInventoryTableContainer