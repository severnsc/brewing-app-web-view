import React from "react"
import { Query } from "react-apollo"
import { TableData, Currency } from "../components"
import { settingsQuery } from "../queries"
import { UPDATE_MODAL } from "../mutations"
import { formatDate } from "../utils"
import {
	HoverableTableRowContainer,
	ConvertCurrencyContainer,
	InventoryTableContainer
} from "./common"

const YeastInventoryTableContainer = () => (
	<Query query={settingsQuery}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { settings } = data.currentUser

			const currencySetting = settings.find(s => s.name === "currency").value
			const dateSetting = settings.find(s => s.name === "dateFormat").value

			const columns = [
				"Yeast name",
				"Amount (vials)",
				"Yeast lab",
				"Yeast number",
				"Yeast type",
				"Dry or Liquid",
				"Cost per vial",
				"Purchase date"
			]

			const map = item => ({
				id: item.id,
				name: JSON.parse(item.object).name,
				currentQuantity: item.currentQuantity,
				quantityUnit: item.quantityUnit,
				lab: JSON.parse(item.object).yeastLab,
				number: JSON.parse(item.object).yeastNumber,
				type: JSON.parse(item.object).yeastType,
				dryOrLiquid: JSON.parse(item.object).dry ? "dry" : "liquid",
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
							sortKey = "lab"
							break

						case columns[3]:
							sortKey = "number"
							break

						case columns[4]:
							sortKey = "type"
							break

						case columns[5]:
							sortKey = "dryOrLiquid"
							break

						case columns[6]:
							sortKey = "unitCost"
							break

						case columns[7]:
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
						entityType="yeast"
						id={item.id}
					>
						<TableData value={item.name} />
						<TableData value={item.currentQuantity} />
						<TableData value={item.lab} />
						<TableData value={item.number} />
						<TableData value={item.type} />
						<TableData value={item.dryOrLiquid} />
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
						name="yeast"
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

export default YeastInventoryTableContainer