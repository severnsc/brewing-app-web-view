import globalStyles from "../../styles"
import formStyles from "../styles"

export default {
	button: {
		...formStyles.button,
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