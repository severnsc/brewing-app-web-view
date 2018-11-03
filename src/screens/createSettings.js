import React from "react"
import SettingsFormContainer from "../containers/common/settingsFormContainer"

const styles = {
	container: {
		alignSelf: "center",
		maxWidth: "600px",
		padding: "10px 0 0 0"
	},
	paragraph: {
		padding: "10px 0"
	}
}

const CreateSettings = () => (
	<div style={styles.container}>
		<p style={styles.paragraph}>Set your preferred units of measurement for use throughout the app. These can be changed at any time in the Profile screen found in the Account submenu.</p>
		<SettingsFormContainer isCreating={true} />
	</div>
)

export default CreateSettings