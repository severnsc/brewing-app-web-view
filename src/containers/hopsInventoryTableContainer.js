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
				totalPages,
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
		
			const startIndex = itemsPerPage * currentPage
			const endIndex = itemsPerPage * (currentPage + 1)

			let tableRows = (
				inventory
				? inventory.items.map(item => ({
						name: JSON.parse(item.object).name,
						amount: item.currentQuantity,
						country: JSON.parse(item.object).countryOfOrigin,
						alphas: JSON.parse(item.object).alphaAcids,
						cost: item.unitCost,
						date: item.lastReorderDate
					}))
					.filter(item => item.name.includes(filterString))
					.sort((a, b) => {
						if(a[sortBy] < b[sortBy]){
							return -1
						}

						if(a[sortBy] > b[sortBy]){
							return 1
						}

						return 0
					})
					.slice(startIndex, endIndex)
					.map(item =>
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

			if(sortOrder === "desc") tableRows = tableRows.reverse()

			return(
				<div>
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
					<PaginationContainer
						page={currentPage}
						totalPages={totalPages}
						showPageNumbers={true}
						showItemsPerPage={true}
						itemsPerPageOptions={[5, 10, 25, 50]}
						itemsPerPage={itemsPerPage}
						pageNumberMutation={UPDATE_HOPS_TABLE_PAGE_NUMBER}
						itemsPerPageMutation={UPDATE_HOPS_TABLE_ITEM_LIMIT}
					/>
				</div>
			)

		}}
	</Query>
)

export default HopsInventoryTableContainer