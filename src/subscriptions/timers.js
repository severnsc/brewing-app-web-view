import gql from "graphql-tag"

export const timerUpdated = gql`
	subscription onTimerUpdate {
		timerUpdated {
			id
			remainingDuration
		}
	}
`