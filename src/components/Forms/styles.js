import { green, errorRed } from "../constants"

export default {
  button: {
		fontSize: "1em",
    padding: "10px",
    borderRadius: "20px",
    color: "hsl(0, 0%, 100%)",
    background: green,
    border: "none",
    appearance: "none",
    "WebkitAppearance": "none",
    "MozAppearance": "none",
    cursor: "pointer",
    width: "10em"
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
    alignItems: "flex-start",
    textTransform: "uppercase",
    color: "hsl(0, 0%, 50%)",
    fontSize: "0.75em",
    marginBottom: "10px"
  },
  labelFocus: {
    color: green
  },
  input: {
    width: "20em",
    height: "2em",
    marginBottom: "10px",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "2px solid",
    borderColor: "hsl(0, 0%, 90%)",
    fontSize: "1em",
    color: "hsl(0, 0%, 50%)"
  },
  inputFocus: {
    borderColor: green,
    outline: "none"
  }
}