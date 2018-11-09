import React from "react"
import { Query } from "react-apollo"
import { settingsQuery } from "../queries"
import { UPDATE_MODAL } from "../mutations"
import { weightUnits, formatDate } from "../utils"
import {
	Currency,
	Weight,
	ConvertWeight,
	MaltColor,
	ConvertMaltColor,
	TableData
} from "../components"

import {
	ConvertCurrencyContainer,
	HoverableTableRowContainer,
	InventoryTableContainer
} from "./common"

const MaltInventoryTableContainer = () => (
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
			const maltColorSetting = settings.find(s => s.name === "maltColor").value

			const columns = [
				"Malt name", 
				`Amount ${weightUnits(weightSetting)}`,
				"Malt type",
				`Malt color ${maltColorSetting}`,
				"Country of origin",
				"Cost per lb",
				"Purchase date"
			]

			const map = item => ({
				id: item.id,
				name: JSON.parse(item.object).name,
				currentQuantity: item.currentQuantity,
				quantityUnit: item.quantityUnit,
				country: JSON.parse(item.object).countryOfOrigin,
				type: JSON.parse(item.object).type,
				color: parseInt(JSON.parse(item.object).color, 10),
				colorUnit: JSON.parse(item.object).colorUnit,
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
							sortKey = "type"
							break

						case columns[3]:
							sortKey = "color"
							break

						case columns[4]:
							sortKey = "country"
							break

						case columns[5]:
							sortKey = "unitCost"
							break

						case columns[6]:
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
						entityType="malt"
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
						<TableData value={item.type} />
						<TableData
							value={
								item.colorUnit === maltColorSetting
								? <MaltColor value={item.color} />
								: <ConvertMaltColor from={item.colorUnit} to={maltColorSetting} value={item.color} /> 
							}
						/>
						<TableData value={item.country} />
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
						name="malt"
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

export default MaltInventoryTableContainer