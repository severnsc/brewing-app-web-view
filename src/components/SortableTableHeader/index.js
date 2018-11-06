import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const SortableTableHeader = ({ columns, sortBy, sortOrder, onClick }) => {

	const sortIndicator = sortOrder === "desc" ? "∨" : "∧"

	return(
		<thead style={styles.tableHead}>
			<tr>
				{columns.map((col, i) => (
						<th
							key={col}
							onClick={() => onClick(col)}
							style={styles.th(columns.length)}
						>
							{
								col === sortBy || (!sortBy && i === 0)
								? col + " " + sortIndicator
								: col
							}
						</th>
					)
				)}
			</tr>
		</thead>
	)
}

SortableTableHeader.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.string).isRequired,
	sortBy: PropTypes.string,
	sortOrder: PropTypes.oneOf(["asc", "desc"]),
	onClick: PropTypes.func.isRequired
}

export default SortableTableHeader