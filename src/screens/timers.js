import React from "react"
import ActiveTimerContainer from "../containers/activeTimerContainer"
import TimersSearchBarContainer from "../containers/timersSearchBarContainer"
import TimersTableContainer from "../containers/timersTableContainer"
import FixedNewTimerButtonContainer from "../containers/FixedNewTimerButtonContainer"
import globalStyles from "../components/styles"

const styles = {
	container: {
		padding: "0 5%",
		background: "rgb(250, 250, 250)"
	}
}

const Timers = () => (
	<div style={styles.container}>
		<h1 style={{...globalStyles.heading, padding: "10px"}}>Timers</h1>
		<ActiveTimerContainer />
		<TimersSearchBarContainer />
		<TimersTableContainer />
		<FixedNewTimerButtonContainer />
	</div>
)

export default Timers