import React from 'react'
import DashboardSearchBarContainer from '../containers/dashboardSearchBarContainer'
import DashboardTableContainer from '../containers/dashboardTableContainer'

const Dashboard = () => (
  <div style={{width: "75%"}}>
    <h1>Total Inventory</h1>
    <DashboardSearchBarContainer />
    <DashboardTableContainer />
  </div>
)

export default Dashboard