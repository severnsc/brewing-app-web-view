import React from 'react'
import SignupContainer from '../containers/signupContainer'
import { green } from "../components/constants"

const styles = {
	container: {
		background:green,
		flex: "1 1 auto",
		width: "100%",
		display:"flex",
		justifyContent:"center",
		alignItems: "flex-start",
		padding: "10px"
	}
}

const Home = () => (
	<div style={styles.container}>
  	<SignupContainer />
  </div>
)

export default Home