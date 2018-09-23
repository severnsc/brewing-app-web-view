import React from "react"
import PropTypes from "prop-types"
import { Flash } from "../components"
import { Query } from "react-apollo"
import { flashQuery } from "../queries"

const FlashContainer = ({ style }) => (
	<Query query={flashQuery}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { message } = data.flash

			return message ? <Flash message={message} style={style} /> : null

		}}
	</Query>
)

FlashContainer.propTypes = {
	style: PropTypes.object
}

export default FlashContainer