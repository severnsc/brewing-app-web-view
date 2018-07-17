import React from 'react'
import MaltInventoryTableContainer from "../containers/maltInventoryTableContainer"
import MaltInventoryTableSearchBarContainer from "../containers/maltInventoryTableSearchBarContainer"
import HopsInventoryTableContainer from "../containers/hopsInventoryTableContainer"
import HopsInventoryTableSearchBarContainer from "../containers/hopsInventoryTableSearchBarContainer"
import YeastInventoryTableContainer from "../containers/yeastInventoryTableContainer"
import YeastInventoryTableSearchBarContainer from "../containers/yeastInventoryTableSearchBarContainer"
import OtherInventoriesTableContainer from "../containers/otherInventoriesTableContainer"
import OtherInventoriesTableSearchBarContainer from "../containers/otherInventoriesTableSearchBarContainer"

const Inventories = () => (
	<div style={{width: "75%"}}>
    <h1>Inventories</h1>
    <h2>Malt</h2>
    	<MaltInventoryTableSearchBarContainer />
    	<MaltInventoryTableContainer />
    <h2>Hops</h2>
      <HopsInventoryTableSearchBarContainer />
    	<HopsInventoryTableContainer />
    <h2>Yeast</h2>
      <YeastInventoryTableSearchBarContainer />
      <YeastInventoryTableContainer />
    <h2>Other</h2>
      <OtherInventoriesTableSearchBarContainer />
      <OtherInventoriesTableContainer />
  </div>
)

export default Inventories