import React from "react"
import PropTypes from "prop-types"
import { Weight } from ".."
import { convertLbsToKg, convertKgToLbs } from "../../utils"

const ConvertWeight = ({ from, to, amount }) => {

	let convertedAmount
	if(from === "imperial" && to === "metric"){
		convertedAmount = convertLbsToKg(amount)
	}

	if(from === "metric" && to === "imperial"){
		convertedAmount = convertKgToLbs(amount)
	}

	return(
		<Weight unit={to} amount={convertedAmount} />
	)
}

ConvertWeight.propTypes = {
	from: PropTypes.oneOf(["metric", "imperial"]).isRequired,
	to: PropTypes.oneOf(["metric", "imperial"]).isRequired,
	amount: PropTypes.number.isRequired
}

export default ConvertWeight