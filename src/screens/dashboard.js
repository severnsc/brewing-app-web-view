import React from 'react'
import DashboardSearchBarContainer from '../containers/dashboardSearchBarContainer'
import DashboardFilterSelectContainer from '../containers/dashboardFilterSelectContainer'
import DashboardTableContainer from '../containers/dashboardTableContainer'

const Dashboard = () => (
  <div>
    <DashboardSearchBarContainer />
    <DashboardFilterSelectContainer />
    <DashboardTableContainer />
  </div>
)

export default Dashboard