import React from "react"
import { Query } from "react-apollo"
import { tableQuery } from "../queries"
import SearchBarContainer from "./common/searchBarContainer"
import { UPDATE_TABLE_FILTER } from "../mutations"

const HopsInventoryTableSearchBarContainer = () => (
	<Query query={tableQuery} variables={{name: "hops"}}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { filterString } = data.table

			return(
				<SearchBarContainer
					mutation={UPDATE_TABLE_FILTER}
					placeholder="Search by hop name"
					name="hops"
					initialValue={filterString}
				/>
			)

		}}
	</Query>
)

export default HopsInventoryTableSearchBarContainer