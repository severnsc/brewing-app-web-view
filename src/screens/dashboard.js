import React from 'react'
import NeedsToBeReorderedContainer from "../containers/needsToBeReorderedContainer"
import globalStyles from "../components/styles"

const styles = {
  container: {
    padding: "0 5%",
    background: "rgb(250, 250, 250)"
  },
  heading: {
    ...globalStyles.heading,
    margin: "10px"
  }
}

const Dashboard = () => (
  <div style={styles.container}>
    <h1 style={styles.heading}>Total Inventory</h1>
    <NeedsToBeReorderedContainer />
  </div>
)

export default Dashboard