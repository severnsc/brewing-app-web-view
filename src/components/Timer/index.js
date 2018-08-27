import React from "react"
import styles from "./styles"
import PropTypes from "prop-types"

const Timer = ({ name, time, isRunning, startTimer, stopTimer, resetTimer, nextAlertMessage, nextAlertActivationTime }) => {

	const startButton = <button onClick={startTimer} style={styles.start}>Start</button>
	const stopButton = <button onClick={stopTimer} style={styles.stop}>Stop</button>

	const nextAlert = nextAlertMessage && nextAlertActivationTime ? <p>Next alert: "{nextAlertMessage}" at {nextAlertActivationTime}</p> : null

	return (
		<div>
			<h2>{name}</h2>
			<h2>{time}</h2>
			{isRunning ? stopButton : startButton}
			<button onClick={resetTimer} style={styles.button}>Reset</button>
			{nextAlert}
		</div>
	)
}

Timer.propTypes = {
	name: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	isRunning: PropTypes.bool.isRequired,
	startTimer: PropTypes.func.isRequired,
	stopTimer: PropTypes.func.isRequired,
	resetTimer: PropTypes.func.isRequired,
	nextAlertMessage: PropTypes.string,
	nextAlertActivationTime: PropTypes.string
}

export default Timer