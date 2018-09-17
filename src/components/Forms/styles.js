import { green, errorRed } from "../constants"

const formStyles = {
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
  container: {
    background: "hsl(0,0%,100%)",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "0 4px 6px 0 hsla(0, 0%, 0%, 0.2)",
    flex: 1,
    maxWidth: "800px"
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

const secondaryButton = {
  ...formStyles.button,
  background: "none",
  border: "1px solid " + green,
  color: green
}

const tertiaryButton = {
  ...formStyles.button,
  border: "none",
  background: "none",
  textDecoration: "underline",
  color: green,
  padding: "5px",
  minWidth: "5em"
}

export default {...formStyles, secondaryButton, tertiaryButton}