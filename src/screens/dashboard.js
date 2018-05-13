import React from 'react'
import DashboardSearchBarContainer from '../containers/dashboardSearchBarContainer'
import DashboardFilterSelectContainer from '../containers/dashboardFilterSelectContainer'
import DashboardTableContainer from '../containers/dashboardTableContainer'
import DashboardTableItemLimitContainer from '../containers/dashboardTableItemLimitContainer'

const Dashboard = () => (
  <div>
    <DashboardSearchBarContainer />
    <DashboardFilterSelectContainer />
    <DashboardTableContainer />
    <DashboardTableItemLimitContainer />
  </div>
)

export default Dashboard