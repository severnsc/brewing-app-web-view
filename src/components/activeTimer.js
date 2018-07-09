import React from "react"
import PropTypes from "prop-types"

const ActiveTimer = ({ time, isRunning, startTimer, stopTimer, resetTimer }) => {

	const styles = {
		button: {
			color: "white",
			backgroundColor: "grey"
		}
	}

	styles.start = {
		...styles.button,
		backgroundColor: "green"
	}

	styles.stop = {
		...styles.button,
		backgroundColor: "red"
	}

	const startButton = <button onClick={startTimer} style={styles.start}>Start</button>
	const stopButton = <button onClick={stopTimer} style={styles.stop}>Stop</button>

	return (
		<div>
			<h2>{time}</h2>
			{isRunning ? stopButton : startButton}
			<button onClick={resetTimer} style={styles.button}>Reset</button>
		</div>
	)
}

ActiveTimer.propTypes = {
	time: PropTypes.string.isRequired,
	isRunning: PropTypes.bool.isRequired,
	startTimer: PropTypes.func.isRequired,
	stopTimer: PropTypes.func.isRequired,
	resetTimer: PropTypes.func.isRequired
}

export default ActiveTimer