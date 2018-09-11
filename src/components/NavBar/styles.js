import { green } from "../constants"

const styles = {
	link: {
    padding: "3px 40px",
    margin: "0",
    color: "#c1c1c1",
  },
  navLink: {
	  display:"inline-block",
	  color: "#c1c1c1",
	  textDecoration:"none",
	  lineHeight: "50px",
	  padding:"0 12px"
	},
	subMenu: {
	  position: "absolute",
	  right: "100px",
	  top: "50px",
	  background: "#383838",
	  display: "flex",
	  flexFlow: "column",
	  borderRadius: "5px"
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
	...styles.link,
  padding: "12px",
  textDecoration: "none"
}

styles.mouseenter = {
	...styles.default,
	backgroundColor: "hsl(0, 0%, 35%)",
	color: "hsla(0, 0%, 100%, 0.9)"
}

styles.navLinkMouseEnter = {
	...styles.navLink,
	color:"hsla(0, 0%, 100%, 90%)",
}

styles.accountLink = {
	...styles.navLink,
	cursor: "pointer",
	marginRight: "100px"
}

styles.accountLinkMouseEnter = {
	...styles.accountLink,
	color:"hsla(0, 0%, 100%, 90%)",
}

export default styles