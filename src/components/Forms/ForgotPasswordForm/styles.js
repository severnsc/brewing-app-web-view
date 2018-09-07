import globalStyles from "../../styles"
import formStyles from "../styles"

export default {
	button: {
		...formStyles.button,
		display: "flex",
		justifyContent: "center"
	},
	container: {
		background: "hsl(0, 0%, 100%)",
		flex: 1,
		maxWidth: "800px",
		borderRadius: "20px",
		padding: "50px"
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