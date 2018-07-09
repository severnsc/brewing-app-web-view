import React from "react"
import ActiveTimerContainer from "../containers/activeTimerContainer"
import TimersSearchBarContainer from "../containers/timersSearchBarContainer"
import TimersTableContainer from "../containers/timersTableContainer"

const Timers = () => (
	<div style={{width:"75%"}}>
		<h1>Timers</h1>
		<ActiveTimerContainer />
		<TimersSearchBarContainer />
		<TimersTableContainer />
	</div>
)

export default Timers