import { green, errorRed } from "./constants"

export default {
	button: {
		fontSize: "1em",
    padding: "10px",
    borderRadius: "20px",
    color: "hsla(0, 0%, 100%, 0.85)",
    background: green,
    border: "none",
    appearance: "none",
    "WebkitAppearance": "none",
    "MozAppearance": "none",
    cursor: "pointer",
    minWidth: "10em"
  },
	heading: {
		fontSize: "2em",
		color: "hsl(0, 0%, 13%)",
		fontWeight: 700
	},
	subHeading: {
		fontSize: "2em",
		color: "hsl(0, 0%, 45%)",
	},
	error: {
		color: errorRed
	}
}