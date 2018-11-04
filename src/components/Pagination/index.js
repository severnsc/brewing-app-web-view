import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const Pagination = ({
	page,
	totalPages,
	showPageNumbers,
	decrement,
	increment
}) => {

	const pageNumbers = []
	if(showPageNumbers){
		while(pageNumbers.length < totalPages){
			pageNumbers.push(pageNumbers.length + 1)
		}
	}

	return(
		<div>
			{
				page > 0
				? <span style={styles.pageButton} onClick={decrement}>&lt; Previous</span>
				: null
			}
			{pageNumbers.map(n => <span key={n} style={styles.pageNumber}>{n}</span>)}
			{
				page < totalPages
				? <span style={styles.pageButton} onClick={increment}>Next &gt;</span>
				: null
			}
		</div>
	)
}

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	showPageNumbers: PropTypes.bool,
	decrement: PropTypes.func.isRequired,
	increment: PropTypes.func.isRequired
}

export default Pagination