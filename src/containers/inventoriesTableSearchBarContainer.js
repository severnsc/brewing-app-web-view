import React from 'react'
import SearchBarContainer from './common/searchBarContainer'
import { UPDATE_INVENTORIES_TABLE_FILTER } from '../mutations'

const InventoriesTableSearchBarContainer = () => (
  <SearchBarContainer mutation={UPDATE_INVENTORIES_TABLE_FILTER} />
)

export default InventoriesTableSearchBarContainer