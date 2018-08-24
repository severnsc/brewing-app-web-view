import React from "react"
import { NewTimerForm } from "../components"
import { Mutation, Query } from "react-apollo"
import { CREATE_TIMER } from "../mutations"
import { currentUserQuery } from "../queries"
import { currentUserFragments } from "../fragments"
import gql from "graphql-tag"

const query = gql`
	query {
		modal @client {
			type
			id
		}

		currentUser {
			id
			...Timers
		}
	}
	${currentUserFragments.timers}
`

const NewTimerFormContainer = () => (
	<Query query={currentUserQuery}>
		{({loading, error, data}) => {

			if(loading) return <p>Loading...</p>
			if(error) return <p>Error!</p>

			const userId = data.currentUser.id

			return(
				<Mutation
					mutation={CREATE_TIMER}
					update={(cache, {data: { createTimer } }) => {
						const { modal, currentUser } = cache.readQuery({ query })
						cache.writeQuery({
							query,
							data: {
								modal: {
									...modal,
									type: "newTimerAlert",
									id: createTimer.id
								},
								currentUser: {
									...currentUser,
									timers: [...currentUser.timers, createTimer]
								}
							}
						})
					}}
				>
					{mutation => {

						const createTimer = (name, duration) => {
							const durationInMs = duration * 60 * 1000
							mutation({ variables: {userId, name, duration: durationInMs, intervalDuration: 1000} })
						}

						return(
							<NewTimerForm handleSubmit={createTimer} />
						)

					}}
				</Mutation>
			)

		}}
	</Query>
)

export default NewTimerFormContainer