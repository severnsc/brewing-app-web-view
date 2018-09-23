import React, { Component } from "react"
import PropTypes from "prop-types"
import { Flash } from "../components"
import { Query, Mutation } from "react-apollo"
import { flashQuery } from "../queries"
import { UPDATE_FLASH } from "../mutations"

class FlashComponent extends Component {

	componentWillUnmount() {
		this.props.unmount()
	}

	render(){
		const { message, style } = this.props
		return <Flash message={message} style={style} />
	}

}

const FlashContainer = ({ style }) => (
	<Query query={flashQuery}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { message } = data.flash

			return(
				<Mutation mutation={UPDATE_FLASH}>
					{updateFlash => {

						const removeFlash = () => {
							updateFlash({ variables: { message: "" } })
						}

						return(
							message 
							? <FlashComponent message={message} style={style} unmount={removeFlash} />
							: null
						)

					}}
				</Mutation>
			)

		}}
	</Query>
)

FlashContainer.propTypes = {
	style: PropTypes.object
}

export default FlashContainer