import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const TableData = ({ value, style }) => {
	return(
		<td style={{...styles.tableData, ...style}}>
			{value}
		</td>
	)
}

TableData.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
	style: PropTypes.object
}

export default TableData