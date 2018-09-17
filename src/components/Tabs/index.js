import React, { Component } from "react"
import PropTypes from "prop-types"

class Tabs extends Component {

	render() {

		return(
			<div>
				{this.props.children}
			</div>
		)

	}

}

Tabs.propTypes = {
	children: PropTypes.element.isRequired
}

export default Tabs