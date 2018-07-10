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

export default styles