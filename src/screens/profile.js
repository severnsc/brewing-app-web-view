import React from "react"
import SettingsFormContainer from "../containers/common/settingsFormContainer"
import ProfileContainer from "../containers/profileContainer"

const styles = {
	container: {
		padding: "10px 5%",
		maxWidth: "600px",
		alignSelf: "center"
	}
}

const Profile = () => (
	<div style={styles.container}>
		<ProfileContainer />
		<SettingsFormContainer isCreating={false} />
	</div>
)

export default Profile