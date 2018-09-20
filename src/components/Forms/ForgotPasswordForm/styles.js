import globalStyles from "../../styles"

export default {
	button: {
		...globalStyles.button,
		display: "flex",
		justifyContent: "center"
	},
	form: {
		marginTop: "10px"
	},
	heading: {
		...globalStyles.heading,
		marginBottom: "10px"
	},
	text: {
		marginTop: "50px",
		textAlign: "left",
		color: "hsl(0, 0%, 50%)"
	}
}