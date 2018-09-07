import { green, errorRed } from "../constants"

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
	disabled: {
		background: "hsl(0, 0%, 90%)",
		cursor: "default"
	},
  error: {
    borderColor: errorRed
  },
  errorText: {
    color: errorRed
  },
  label: {
    display: "flex",
    flexFlow: "column",
    alignItems: "stretch",
    textAlign: "left",
    textTransform: "uppercase",
    color: "hsl(0, 0%, 50%)",
    fontSize: "0.75em",
    marginBottom: "10px"
  },
  labelFocus: {
    color: green
  },
  input: {
    margin: "10px 0",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "2px solid",
    borderColor: "hsl(0, 0%, 90%)",
    fontSize: "1.25em",
    color: "hsl(0, 0%, 50%)"
  },
  inputFocus: {
    borderColor: green,
    outline: "none"
  }
}