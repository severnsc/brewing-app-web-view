import globalStyles from "../styles"

const styles = {
	alert: {
		marginTop: "10px"
	},
	button: {
		borderRadius: "20px",
		border: "none",
		fontSize: "1em",
		color: "white",
		backgroundColor: "hsl(0, 0%, 75%)",
		flex: "1",
		margin: "10px",
		padding: "5px",
		maxWidth: "75px",
		cursor: "pointer"
	},
	buttons: {
		display: "flex",
		justifyContent: "center"
	},
	container: {
		background: "hsl(0, 0%, 98%)",
		padding: "20px",
		minWidth: "50%",
		marginTop: "10px"
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
	backgroundColor: "hsla(161, 66%, 45%, 1)"
}

styles.stop = {
	...styles.button,
	backgroundColor: "hsl(0, 84%, 66%)"
}

export default styles