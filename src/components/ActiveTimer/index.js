import React from "react"
import styles from "./styles"
import PropTypes from "prop-types"

const ActiveTimer = ({ name, time, isRunning, startTimer, stopTimer, resetTimer }) => {

	const startButton = <button onClick={startTimer} style={styles.start}>Start</button>
	const stopButton = <button onClick={stopTimer} style={styles.stop}>Stop</button>

	return (
		<div>
			<h2>{name}</h2>
			<h2>{time}</h2>
			{isRunning ? stopButton : startButton}
			<button onClick={resetTimer} style={styles.button}>Reset</button>
		</div>
	)
}

ActiveTimer.propTypes = {
	name: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	isRunning: PropTypes.bool.isRequired,
	startTimer: PropTypes.func.isRequired,
	stopTimer: PropTypes.func.isRequired,
	resetTimer: PropTypes.func.isRequired
}

export default ActiveTimer