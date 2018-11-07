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
	formatDate
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
						id: item.id,
						name: JSON.parse(item.object).name,
						currentQuantity: item.currentQuantity,
						quantityUnit: item.quantityUnit,
						country: JSON.parse(item.object).countryOfOrigin,
						alphas: JSON.parse(item.object).alphaAcids,
						unitCost: item.unitCost,
						costUnit: item.costUnit,
						date: item.lastReorderDate
					}))
					.filter(item => item.name.toLowerCase().includes(filterString))
					.sort((a, b) => {

						let sortKey
						switch(sortBy){
							
							case columns[1]:
								sortKey = "currentQuantity"
								break

							case columns[2]:
								sortKey = "country"
								break

							case columns[3]:
								sortKey = "alphas"
								break

							case columns[4]:
								sortKey = "unitCost"
								break

							case columns[5]:
								sortKey = "date"
								break

							default:
								sortKey = "name"
						}

						if(a[sortKey] < b[sortKey]){
							return -1
						}

						if(a[sortKey] > b[sortKey]){
							return 1
						}

						return 0
					})
					.slice(startIndex, endIndex)
					.map(item =>
						<HoverableTableRowContainer
							key={item.id}
							modalMutation={UPDATE_MODAL}
							entityType="hops"
							id={item.id}
						>
							<TableData value={item.name} />
							<TableData
								value={
									item.quantityUnit === weightSetting.value
									? <Weight amount={item.currentQuantity} unit={weightSetting.value} />
									: <ConvertWeight from={item.quantityUnit} to={weightSetting.value} amount={item.currentQuantity}/>
								}
							/>
							<TableData value={item.country} />
							<TableData value={item.alphas + "%"} />
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