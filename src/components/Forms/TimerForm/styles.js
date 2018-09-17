import globalStyles from "../../styles"
import formStyles from "../styles"

export default {
	button: {
		...formStyles.button,
		padding: "5px 10px",
		minWidth: "5em",
		marginRight: "10px"
	},
	subHeading: {
		...globalStyles.subHeading,
		marginTop: "20px"
	},
	title: {
		...globalStyles.subHeading,
		marginBottom: "10px"
	}
}