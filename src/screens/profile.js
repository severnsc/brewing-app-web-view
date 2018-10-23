import React from "react"
import SettingsFormContainer from "../containers/common/settingsFormContainer"
import ProfileContainer from "../containers/profileContainer"

const Profile = () => (
	<div>
		<ProfileContainer />
		<SettingsFormContainer isCreating={false} />
	</div>
)

export default Profile