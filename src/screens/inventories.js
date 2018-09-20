import React from 'react'
import { Tabs, Tab } from "../components"
import MaltInventoryTableContainer from "../containers/maltInventoryTableContainer"
import MaltInventoryTableSearchBarContainer from "../containers/maltInventoryTableSearchBarContainer"
import NewMaltButtonContainer from "../containers/newMaltButtonContainer"
import HopsInventoryTableContainer from "../containers/hopsInventoryTableContainer"
import HopsInventoryTableSearchBarContainer from "../containers/hopsInventoryTableSearchBarContainer"
import NewHopsButtonContainer from "../containers/newHopsButtonContainer"
import YeastInventoryTableContainer from "../containers/yeastInventoryTableContainer"
import YeastInventoryTableSearchBarContainer from "../containers/yeastInventoryTableSearchBarContainer"
import NewYeastButtonContainer from "../containers/newYeastButtonContainer"
import OtherInventoriesTableContainer from "../containers/otherInventoriesTableContainer"
import OtherInventoriesTableSearchBarContainer from "../containers/otherInventoriesTableSearchBarContainer"
import NewOtherButtonContainer from "../containers/newOtherButtonContainer"
import globalStyles from "../components/styles"


const styles = {
  button: {
    position: "absolute",
    right: "10px",
    top: "-5px"
  },
  container: {
    padding: "0 5%",
    background: "rgb(250, 250, 250)"
  },
  heading: {
    ...globalStyles.heading,
    margin: "10px"
  },
  relative: {
    position: "relative"
  }
}

const MaltComponent = (
  <div key="Malt" style={styles.relative}>
    <h2 style={globalStyles.subHeading}>Malt</h2>
    <NewMaltButtonContainer style={styles.button} />
    <MaltInventoryTableSearchBarContainer />
    <MaltInventoryTableContainer />
  </div>
)

const HopsComponent = (
  <div key="Hops" style={styles.relative}>
    <h2 style={globalStyles.subHeading}>Hops</h2>
    <NewHopsButtonContainer style={styles.button} />
    <HopsInventoryTableSearchBarContainer />
    <HopsInventoryTableContainer />
  </div>
)

const YeastComponent = (
  <div key="Yeast" style={styles.relative}>
    <h2 style={globalStyles.subHeading}>Yeast</h2>
    <NewYeastButtonContainer style={styles.button} />
    <YeastInventoryTableSearchBarContainer />
    <YeastInventoryTableContainer />
  </div>
)

const OtherComponent = (
  <div key="Other" style={styles.relative}>
    <h2 style={globalStyles.subHeading}>Other</h2>
    <NewOtherButtonContainer style={styles.button} />
    <OtherInventoriesTableSearchBarContainer />
    <OtherInventoriesTableContainer />
  </div>
)

const Inventories = () => (
	<div style={styles.container}>
    <h1 style={styles.heading}>Inventories</h1>
    <Tabs>
      <Tab key="Malt" label="Malt" component={MaltComponent} active={true} />
      <Tab key="Hops" label="Hops" component={HopsComponent} active={false} />
      <Tab key="Yeat" label="Yeast" component={YeastComponent} active={false} />
      <Tab key="Other" label="Other" component={OtherComponent} active={false} />
    </Tabs>
  </div>
)

export default Inventories