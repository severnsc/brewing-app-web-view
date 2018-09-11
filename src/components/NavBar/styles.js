import { green } from "../constants"

const styles = {
	link: {
    padding: "3px 40px",
    margin: "0",
    color: "hsla(0, 0%, 100%, 0.9)"
  },
  navLink: {
	  display:"inline-block",
	  color:"hsla(0, 0%, 100%, 90%)",
	  textDecoration:"none",
	  lineHeight: "50px",
	  padding:"0 12px"
	},
	subMenu: {
	  position: "absolute",
	  right: "100px",
	  top: "50px",
	  background: "hsl(0, 0%, 22%)",
	  display: "flex",
	  flexFlow: "column",
	  border:"1px solid"
	},
	nav: {
		display:"flex",
		justifyContent:"space-between",
		alignItems: "center",
		height:"50px",
		backgroundColor:"#383838",
		borderTop: "5px solid",
		borderColor: green
	},
	span: {
		marginLeft:"100px"
	}
}

styles.default = {
	...styles.linkStyle,
  padding: "12px",
  textDecoration: "none",
  backgroundColor: "white",
	color: "hsl(0, 0%, 22%)"
}

styles.mouseenter = {
	...styles.default,
	backgroundColor: "#c1c1c1",
	color: "hsla(0, 0%, 100%, 0.9)"
}

styles.navLinkMouseEnter = {
	...styles.navLink,
	backgroundColor: "#c1c1c1"
}

styles.accountLink = {
	...styles.navLink,
	cursor: "pointer",
	marginRight: "100px"
}

styles.accountLinkMouseEnter = {
	...styles.accountLink,
	backgroundColor: "#c1c1c1"
}

export default styles