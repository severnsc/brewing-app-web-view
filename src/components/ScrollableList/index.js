import React, { Fragment } from "react"
import PropTypes from "prop-types"

const ScrollableList = ({ header, data, renderItem }) => (
	<Fragment>
		{header}
		{data.map(i => renderItem(i))}
	</Fragment>
)

ScrollableList.propTypes = {
	header: PropTypes.element,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	renderItem: PropTypes.func.isRequired
}

export default ScrollableList