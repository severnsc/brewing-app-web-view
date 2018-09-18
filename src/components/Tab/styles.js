import { green } from "../constants"

const styles = {
	tab: {
		display: "inline-block",
		padding: "10px",
		color: "hsl(0, 0%, 76%)",
		cursor: "pointer"
	}
}

export default {
	...styles,
	active: {
		...styles.tab,
		color: "hsla(0, 0%, 100%, 0.9)",
		borderBottom: "3px solid " + green
	}
}