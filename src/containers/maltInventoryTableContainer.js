import React from "react"
import { Query } from "react-apollo"
import { maltInventoryTableQuery } from "../queries"
import { Lovibond, Currency, Weight } from "../components"
import SortableTableContainer from "./common/sortableTableContainer"
import ConvertCurrencyContainer from "./common/convertCurrencyContainer"
import shortid from "shortid"
import {
	UPDATE_MALT_TABLE_SORT,
	UPDATE_MALT_TABLE_ITEM_LIMIT,
	UPDATE_MALT_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"
import moment from "moment"
import {
	weightUnits,
	convertWeight
} from "../utils"

const MaltInventoryTableContainer = () => (
	<Query query={maltInventoryTableQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { settings } = data.currentUser
			const weightSettings = settings.find(setting => setting.name === "weight")
			const currencySetting = settings.find(setting => setting.name === "currency")
			const maltColorSetting = settings.find(setting => setting.name === "maltColor")

			const columns = [
				{id: shortid.generate(), name: "Malt name"},
				{id: shortid.generate(), name: `Amount ${weightUnits(weightSettings.value)}`},
				{id: shortid.generate(), name: "Malt type"},
				{id: shortid.generate(), name: `Malt color ${maltColorSetting.value}`},
				{id: shortid.generate(), name: "Country of origin"},
				{id: shortid.generate(), name: "Cost per lb"},
				{id: shortid.generate(), name: "Purchase date"}
			]

			const { maltInventoryTable, currentUser } = data

			const {
				sortBy,
				sortOrder,
				itemLimit,
				currentPage,
				filterString
			} = maltInventoryTable

			const inventory = currentUser.inventories
																	 .find(inventory => inventory.name === "Malt")
			const tableRows = inventory
												? inventory.items.map(item => ({
																					 	id: item.id,
																					 	cells: [
																					 		JSON.parse(item.object).name,
																					 		<Weight amount={convertWeight(item.currentQuantity, item.quantityUnit, weightSettings.value)} unit={weightSettings.value} />,
																					 		JSON.parse(item.object).type,
																					 		<Lovibond value={parseInt(JSON.parse(item.object).color, 10)} />,
																					 		JSON.parse(item.object).countryOfOrigin,
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

			const colorSort = (tableRows, order, sortIndex) => {
				return tableRows.concat().sort((a, b) => {
					const aValue = a.cells[sortIndex].props.value
					const bValue = b.cells[sortIndex].props.value

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
				"Malt color (SRM)": colorSort,
				"Cost per lb": costSort
			}

			return(
				<SortableTableContainer
					sortOrderMutation={UPDATE_MALT_TABLE_SORT}
					columns={columns}
					tableRows={filteredRows || tableRows}
					sortBy={sortBy}
					sortOrder={sortOrder}
					itemsPerPageOptions={[5,25,50,100]}
					itemsPerPage={itemLimit}
					itemsPerPageMutation={UPDATE_MALT_TABLE_ITEM_LIMIT}
					currentPage={currentPage}
					pageNumberMutation={UPDATE_MALT_TABLE_PAGE_NUMBER}
					modalMutation={UPDATE_MODAL}
					entityType="malt"
					customSort={customSort}
				/>
			)

		}}
	</Query>
)

export default MaltInventoryTableContainer