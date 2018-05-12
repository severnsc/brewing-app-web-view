import React from 'react'
import SearchBarContainer from './searchBarContainer'
import { UPDATE_DASHBOARD_TABLE_FILTER } from '../mutations'

const DashboardSearchBarContainer = () => (
  <SearchBarContainer mutation={UPDATE_DASHBOARD_TABLE_FILTER} />
)

export default DashboardSearchBarContainer