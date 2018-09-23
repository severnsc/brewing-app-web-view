import React from "react"
import { Flash } from "../components"
import { Query } from "react-apollo"
import { flashQuery } from "../queries"

const FlashContainer = (
	<Query query={flashQuery}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { message } = data.flash

			return(
				<Flash message={message} />
			)

		}}
	</Query>
)

export default FlashContainer