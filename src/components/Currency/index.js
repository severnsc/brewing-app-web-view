import React from "react"
import PropTypes from "prop-types"

const Currency = ({ amount, unit }) => {

	let currencySymbol
	switch(unit){
		case "USD":
			currencySymbol = "$"
			break

		case "GBP":
			currencySymbol = "£"
			break

		case "EUR":
			currencySymbol = "€"
			break

		default:
			currencySymbol = ""
	}

	const parsedAmount = parseFloat(amount).toFixed(2)

	return(
		<span>
			{currencySymbol}{parsedAmount}
		</span>
	)
}

Currency.propTypes = {
	amount: PropTypes.number.isRequired,
	unit: PropTypes.oneOf(["USD", "GBP", "EUR"]).isRequired
}

export default Currency