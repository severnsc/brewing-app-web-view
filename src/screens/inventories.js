import React from 'react'
import InventoriesTableSearchBarContainer from '../containers/inventoriesTableSearchBarContainer'
import InventoriesTableContainer from '../containers/inventoriesTableContainer'

const Inventories = () => (
	<div style={{width: "75%"}}>
    <h1>All Inventories</h1>
    <InventoriesTableSearchBarContainer />
    <InventoriesTableContainer />
  </div>
)

export default Inventories