import React from 'react'
import MaltInventoryTableContainer from "../containers/maltInventoryTableContainer"
import MaltInventoryTableSearchBarContainer from "../containers/maltInventoryTableSearchBarContainer"

const Inventories = () => (
	<div style={{width: "75%"}}>
    <h1>Inventories</h1>
    <h2>Malt</h2>
    	<MaltInventoryTableSearchBarContainer />
    	<MaltInventoryTableContainer />
    <h2>Hops</h2>
    <h2>Yeast</h2>
    <h2>Other</h2>
  </div>
)

export default Inventories