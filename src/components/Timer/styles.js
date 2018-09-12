import globalStyles from "../styles"

const styles = {
	alert: {
		marginTop: "10px"
	},
	button: {
		color: "white",
		backgroundColor: "grey",
		flex: "1",
		margin: "10px",
		padding: "5px"
	},
	buttons: {
		display: "flex"
	},
	container: {
		background: "hsl(0, 0%, 98%)",
		padding: "20px"
	},
	time: {
		...globalStyles.heading,
		padding: "10px"
	},
	title: {
		...globalStyles.subHeading,
		marginBottom: "10px"
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