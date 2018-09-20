import React from "react"
import ActiveTimerContainer from "../containers/activeTimerContainer"
import TimersSearchBarContainer from "../containers/timersSearchBarContainer"
import TimersTableContainer from "../containers/timersTableContainer"
import NewTimerButtonContainer from "../containers/NewTimerButtonContainer"
import globalStyles from "../components/styles"

const styles = {
	button: {
		position: "absolute",
		right: "5%",
		top: "5px"
	},
	container: {
		padding: "0 5%",
		background: "rgb(250, 250, 250)",
		position: "relative"
	},
	heading: {
		...globalStyles.heading,
		padding: "10px",
	}
}

const Timers = () => (
	<div style={styles.container}>
		<h1 style={styles.heading}>Timers</h1>
		<NewTimerButtonContainer style={styles.button} />
		<ActiveTimerContainer />
		<TimersSearchBarContainer />
		<TimersTableContainer />
	</div>
)

export default Timers