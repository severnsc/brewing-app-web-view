const errorRed = "hsl(353, 85%, 44%)"
const green = "hsl(167, 90%, 38%)"

const styles = {
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
	flexColumn: {
    display: "flex",
    flexDirection:"column"
  },
  labelDefault: {
  	display: "flex",
	  flexFlow: "column",
	  alignItems: "flex-start",
	  textTransform: "uppercase",
	  color: "hsl(0, 0%, 50%)",
	  fontSize: "0.75em",
	  marginBottom: "10px"
  },
  login: {
  	fontSize: "0.8em",
  	marginLeft:"10px"
  },
  loginLink: {
  	color: green
  },
  inputDefault: {
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
  submit: {
  	display: "flex",
  	justifyContent: "flex-start",
  	alignItems: "center"
  },
  error: {
  	borderColor: errorRed
  },
  errorText: {
  	color: errorRed
  }
}

export default {
	...styles,
	labelFocus: {
		...styles.labelDefault,
		color: green
	},
	inputFocus: {
		...styles.inputDefault,
		borderColor:green,
  	outline:"none"
	}
}