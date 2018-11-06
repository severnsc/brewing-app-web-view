import React from "react"
import PropTypes from "prop-types"
import styles from "./styles"

const Pagination = ({
	page,
	totalPages,
	showPageNumbers,
	decrement,
	increment,
	updatePageNumber,
	showItemsPerPage,
	itemsPerPageOptions,
	itemsPerPage,
	updateItemsPerPage
}) => {

	const pageNumbers = []
	if(showPageNumbers){
		while(pageNumbers.length < totalPages){
			pageNumbers.push(pageNumbers.length + 1)
		}
	}

	return(
		<div>
			<div>
				{
					page > 0
					? <span style={styles.pageButton} onClick={decrement}>&lt; Previous</span>
					: null
				}
				{
					pageNumbers.map(n => 
						<span
							key={n}
							style={
								n === page + 1
								? {...styles.pageNumber, ...styles.currentPage}
								: styles.pageNumber
							}
							onClick={() => updatePageNumber(n)}
						>
							{n}
						</span>
					)
				}
				{
					page < totalPages
					? <span style={styles.pageButton} onClick={increment}>Next &gt;</span>
					: null
				}
			</div>
			{
				showItemsPerPage
				? (
						<div>
							<select value={itemsPerPage} onChange={e => updateItemsPerPage(e.target.value)}>
								{itemsPerPageOptions.map(option => 
									<option key={option} value={option}>{option}</option>)}
							</select>
							<span style={styles.itemsPerPage}>items per page</span>
						</div>
					)
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
	increment: PropTypes.func.isRequired,
	updatePageNumber: PropTypes.func.isRequired,
	showItemsPerPage: PropTypes.bool,
	itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
	itemsPerPage: PropTypes.number,
	updateItemsPerPage: PropTypes.func
}

export default Pagination