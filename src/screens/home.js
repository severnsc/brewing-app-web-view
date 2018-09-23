import React from 'react'
import FlashContainer from "../containers/flashContainer"
import SignupContainer from '../containers/signupContainer'

const styles = {
	container: {
		background:"linear-gradient(to top left, hsl(167, 90%, 38%), hsl(167, 90%, 90%))",
		flex: "1 1 auto",
		display:"flex",
		justifyContent:"center",
		alignItems: "flex-start",
		padding: "50px 10px 0px",
		position: "relative"
	},
	flash: {
		position: "absolute",
		top: "60px"
	}
}

const Home = () => (
	<div style={styles.container}>
		<FlashContainer style={styles.flash} />
  	<SignupContainer />
  </div>
)

export default Home