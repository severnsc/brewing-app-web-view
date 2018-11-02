import React from "react"
import PropTypes from "prop-types"
import { Currency } from "../../components"
import { Query } from "react-apollo"
import { currencyExchangeQuery } from "../../queries"

const ConvertCurrencyContainer = ({ from, to, amount }) => (
	<Query query={currencyExchangeQuery} variables={{ from, to, amount }}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { result } = data.currencyExchange

			return(
				<Currency amount={result} unit={to} />
			)

		}}
	</Query>
)

ConvertCurrencyContainer.propTypes = {
	from: PropTypes.oneOf(["USD", "EUR", "GBP"]).isRequired,
	to: PropTypes.oneOf(["USD", "EUR", "GBP"]).isRequired,
	amount: PropTypes.number.isRequired,
}

export default ConvertCurrencyContainer