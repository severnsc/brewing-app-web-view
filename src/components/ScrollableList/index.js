import React from "react"
import PropTypes from "prop-types"

const styles = {
	container: {
		display: "flex",
		flexFlow: "column"
	}
}

const ScrollableList = ({ header, data, renderItem, style }) => (
	<div style={{...styles.container, ...style}}>
		{header}
		{data.map(i => renderItem(i))}
	</div>
)

ScrollableList.propTypes = {
	header: PropTypes.element,
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
	renderItem: PropTypes.func.isRequired,
	style: PropTypes.object
}

export default ScrollableList