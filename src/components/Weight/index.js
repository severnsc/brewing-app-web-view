import React from "react"
import PropTypes from "prop-types"
import { formatWeightString } from "../../utils"

const Weight = ({ amount, unit }) => {

	return(
		<span>
			{formatWeightString(amount, unit)}
		</span>
	)
}

Weight.propTypes = {
	amount: PropTypes.number.isRequired,
	unit: PropTypes.oneOf(["imperial", "metric"]).isRequired
}

export default Weight