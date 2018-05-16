import React from 'react'
import SearchBarContainer from './common/searchBarContainer'
import { UPDATE_DASHBOARD_TABLE_FILTER } from '../mutations'

const DashboardSearchBarContainer = () => (
  <SearchBarContainer mutation={UPDATE_DASHBOARD_TABLE_FILTER} />
)

export default DashboardSearchBarContainer