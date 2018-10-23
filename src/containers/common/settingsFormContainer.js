import React from "react"
import { SettingsForm } from "../../components"
import { Mutation, Query } from "react-apollo"
import { settingsQuery } from "../../queries"
import { CREATE_SETTING, UPDATE_SETTING } from "../../mutations"

const SettingsFormContainer = ({ isCreating, history }) => (
	<Query query={settingsQuery}>
		{({ loading, error, data }) => {

			if(loading) return <p>Loading...</p>
			if(error){
				console.error(error)
				return <p>Error!</p>
			}

			const { currentUser } = data
			const { settings: currentUserSettings } = currentUser

			const mutation = isCreating ? CREATE_SETTING : UPDATE_SETTING

			return(
				<Mutation mutation={mutation}>
					{mutation => {

						const onSubmit = (weight, liquid, currency, maltColor, beerColor) => {
							const settings = {
								weight,
								liquid,
								currency,
								maltColor,
								beerColor
							}

							if(isCreating){
								Object.keys(settings).forEach(key => {
									mutation({
										variables: {
											userId: currentUser.id,
											name: key,
											value: settings[key]
										}
									}).then(() => history.push("/dashboard"))
								})
							}else{
								currentUserSettings.forEach(userSetting => {
									if(userSetting.value !== settings[userSetting.name]){
										mutation({
											variables: {
												id: userSetting.id,
												value: settings[userSetting.name]
											}
										})
									}
								})	
							}
							
						}

						const props = {}
						if(!isCreating){
							currentUserSettings.forEach(userSetting => {
								props[userSetting.name] = userSetting.value
							})
						}

						return(
							<SettingsForm
								onSubmit={onSubmit}
								{...props}
							/>
						)

					}}
				</Mutation>
			)

		}}
	</Query>
)

export default SettingsFormContainer