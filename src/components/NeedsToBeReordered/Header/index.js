import React from "react"

const styles = {
	container: {
		"background": "hsl(0, 0%, 25%)",
		"color": "hsla(0, 0%, 100%, 0.9)",
		padding: "10px",
		display:"flex",
	},
	item: {
		margin: "0px 10px"
	}
}

const Header = () => (
	<div style={styles.container}>
		<span style={styles.item}>Item name</span>
		<span style={styles.item}>Amount</span>
	</div>
)

export default Header