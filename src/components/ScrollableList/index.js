import React from "react"
import PropTypes from "prop-types"

const ScrollableList = ({ header, data, renderItem, style, footer }) => (
	<div style={style}>
		{header}
		{data.map(i => renderItem(i))}
		{footer}
	</div>
)

ScrollableList.propTypes = {
	header: PropTypes.element,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	renderItem: PropTypes.func.isRequired,
	style: PropTypes.object,
	footer: PropTypes.element
}

export default ScrollableList