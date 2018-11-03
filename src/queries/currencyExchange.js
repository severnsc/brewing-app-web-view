import gql from "graphql-tag"

export default gql`
	query exchangeQuery($from: String!, $to: String!, $amount: Float!) {
		currencyExchange(from: $from, to: $to, amount: $amount) {
			result
		}
	}
`