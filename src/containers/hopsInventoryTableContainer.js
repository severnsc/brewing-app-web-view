import React from "react"
import {
	ConvertWeight,
	Weight,
	Currency,
	Table,
	TableData
} from "../components"
import { Query } from "react-apollo"
import { hopsInventoryTableQuery } from "../queries"

import {
	ConvertCurrencyContainer,
	SortableTableHeaderContainer,
	HoverableTableRowContainer,
	PaginationContainer
} from "./common"

import {
	UPDATE_HOPS_TABLE_SORT,
	UPDATE_HOPS_TABLE_ITEM_LIMIT,
	UPDATE_HOPS_TABLE_PAGE_NUMBER,
	UPDATE_MODAL
} from "../mutations"

import {
	weightUnits,
	formatDate,
	generateId
} from "../utils"

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
			const dateSetting = settings.find(setting => setting.name === "dateFormat")

			const columns = [
				"Hop name",
				`Amount ${weightUnits(weightSetting.value)}`,
				"Country of origin",
				"Alpha acid %",
				"Cost per lb",
				"Purchase date"
			]

			const inventory = currentUser.inventories.find(inventory => inventory.name === "Hops")
			const tableRows = (
				inventory
				? inventory.items.map(item => 
						<HoverableTableRowContainer
							modalMutation={UPDATE_MODAL}
							entityType="hops"
							id={item.id}
						>
							<TableData value={JSON.parse(item.object).name} />
							<TableData
								value={
									item.quantityUnit === weightSetting.value
									? <Weight amount={item.currenQuantity} unit={weightSetting.value} />
									: <ConvertWeight from={item.quantityUnit} to={weightSetting.value} amount={item.currenQuantity}/>
								}
							/>
							<TableData value={JSON.parse(item.object).countryOfOrigin} />
							<TableData value={JSON.parse(item.object).alphaAcids + "%"} />
							<TableData
								value={
									item.costUnit === currencySetting.value
									? <Currency amount={item.unitCost} unit={currencySetting.value} />
									: <ConvertCurrencyContainer from={item.costUnit} to={currencySetting.value} amount={item.unitCost} />
								}
							/>
							<TableData
								value={
									formatDate(item.lastReorderDate, dateSetting.value)
								}
							/>
						</HoverableTableRowContainer>
					)
				: []
			)

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
				<Table>
					<SortableTableHeaderContainer
						columns={columns}
						sortBy={sortBy}
						sortOrder={sortOrder}
						toggleSortMutation={UPDATE_HOPS_TABLE_SORT}
					/>
					<tbody>
						{tableRows}
					</tbody>
				</Table>
			)

		}}
	</Query>
)

export default HopsInventoryTableContainer