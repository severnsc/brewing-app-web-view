const styles = {
	link: {
    padding: "3px 40px",
    margin: "0",
    color: "white"
  },
  navLink: {
	  display:"inline-block",
	  color:"white",
	  textDecoration:"none",
	  lineHeight: "50px",
	  padding:"0 12px",
	  backgroundColor: ""
	},
	subMenu: {
	  position: "absolute",
	  right: "100px",
	  top: "50px",
	  backgroundColor: "gray",
	  display: "flex",
	  flexFlow: "column",
	  border:"1px solid"
	},
	nav: {
		display:"flex",
		justifyContent:"space-between",
		alignItems: "center",
		height:"50px",
		backgroundColor:"#383838"
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
	color: "black"
}

styles.mouseenter = {
	...styles.default,
	backgroundColor: "#c1c1c1",
	color: "white"
}

styles.navLinkMouseEnter = {
	...styles.navLink,
	backgroundColor: "gray"
}

styles.accountLink = {
	...styles.navLink,
	cursor: "pointer",
	marginRight: "100px"
}

styles.accountLinkMouseEnter = {
	...styles.accountLink,
	backgroundColor: "gray"
}

export default styles