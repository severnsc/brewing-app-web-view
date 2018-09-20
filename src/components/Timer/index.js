import React from "react"
import styles from "./styles"
import PropTypes from "prop-types"
import { Button } from ".."

const Timer = ({ name, time, isRunning, startTimer, stopTimer, resetTimer, nextAlertMessage, nextAlertActivationTime }) => {

	const startButton = <Button onClick={startTimer} style={styles.start} value="Start" />
	const stopButton = <Button onClick={stopTimer} style={styles.stop} value="Stop" />

	const nextAlert = nextAlertMessage && nextAlertActivationTime ? <p style={styles.alert}>Next alert: "{nextAlertMessage}" at {nextAlertActivationTime}</p> : null

	return (
		<div style={styles.container}>
			<h2 style={styles.title}>{name}</h2>
			<h2 style={styles.time}>{time}</h2>
			<span style={styles.buttons}>
				{isRunning ? stopButton : startButton}
				<Button onClick={resetTimer} style={styles.button} value="Reset" />
			</span>
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