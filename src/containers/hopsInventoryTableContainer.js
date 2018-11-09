import React from "react"

import {
	ConvertWeight,
	Weight,
	Currency,
	TableData
} from "../components"

import { Query } from "react-apollo"
import { settingsQuery } from "../queries"

import {
	ConvertCurrencyContainer,
	HoverableTableRowContainer,
	InventoryTableContainer
} from "./common"

import { UPDATE_MODAL } from "../mutations"

import {
	weightUnits,
	formatDate
} from "../utils"

const HopsInventoryTableContainer = () => (
	<Query query={settingsQuery}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { settings } = data.currentUser

			const weightSetting = settings.find(s => s.name === "weight").value
			const currencySetting = settings.find(s => s.name === "currency").value
			const dateSetting = settings.find(s => s.name === "dateFormat").value

			const columns = [
				"Hop name",
				`Amount ${weightUnits(weightSetting)}`,
				"Country of origin",
				"Alpha acid %",
				"Cost per lb",
				"Purchase date"
			]

			const map = item => ({
				id: item.id,
				name: JSON.parse(item.object).name,
				currentQuantity: item.currentQuantity,
				quantityUnit: item.quantityUnit,
				country: JSON.parse(item.object).countryOfOrigin,
				alphas: JSON.parse(item.object).alphaAcids,
				unitCost: item.unitCost,
				costUnit: item.costUnit,
				lastReorderDate: new Date(item.lastReorderDate)
			})

			const sort = sortBy => 
				(a, b) => {

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
							sortKey = "lastReorderDate"
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
				}

			const render = item => (
				<HoverableTableRowContainer
					key={item.id}
					modalMutation={UPDATE_MODAL}
					entityType="hops"
					id={item.id}
				>
					<TableData value={item.name} />
					<TableData
						value={
							item.quantityUnit === weightSetting
							? <Weight amount={item.currentQuantity} unit={weightSetting} />
							: <ConvertWeight from={item.quantityUnit} to={weightSetting} amount={item.currentQuantity}/>
						}
					/>
					<TableData value={item.country} />
					<TableData value={item.alphas + "%"} />
					<TableData
						value={
							item.costUnit === currencySetting
							? <Currency amount={item.unitCost} unit={currencySetting} />
							: <ConvertCurrencyContainer from={item.costUnit} to={currencySetting} amount={item.unitCost} />
						}
					/>
					<TableData
						value={
							formatDate(
								item.lastReorderDate,
								dateSetting
							)
						}
					/>
				</HoverableTableRowContainer>
			)

			return(
				<InventoryTableContainer
					name="hops"
					columns={columns}
					itemsPerPageOptions={[5, 10, 25, 50]}
					map={map}
					sort={sort}
					render={render}
				/>
			)

		}}
	</Query>
)

export default HopsInventoryTableContainer