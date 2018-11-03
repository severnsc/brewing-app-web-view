import React from "react"
import PropTypes from "prop-types"

const Pagination = ({ page, totalPages }) => {
	return(
		<div>
			{page > 0 ? <span>&lt; Previous</span> : null}
			{page < totalPages ? <span>Next &gt;</span> : null}
		</div>
	)
}

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired
}

export default Pagination