import React from 'react'
import NeedsToBeReorderedContainer from "../containers/needsToBeReorderedContainer"
import ItemsToBeDeliveredContainer from "../containers/itemsToBeDeliveredContainer"
import globalStyles from "../components/styles"

const styles = {
  container: {
    padding: "10px 5%",
    background: "rgb(250, 250, 250)",
    display: "flex"
  },
  child: {
    flex: 1,
    margin: "0px 10px"
  },
  heading: {
    ...globalStyles.heading,
    margin: "10px"
  }
}

const Dashboard = () => (
  <div style={styles.container}>
    <NeedsToBeReorderedContainer style={styles.child} />
    <ItemsToBeDeliveredContainer style={styles.child} />
  </div>
)

export default Dashboard