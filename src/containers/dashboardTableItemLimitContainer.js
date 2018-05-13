import React from 'react'
import { Query } from 'react-apollo'
import { dashboardItemLimitQuery } from '../queries'
import { UPDATE_DASHBOARD_ITEM_LIMIT } from '../mutations'
import TableItemLimitContainer from './common/tableItemLimitContainer'

const DashboardTableItemLimitContainer = () => (
  <Query query={ dashboardItemLimitQuery }>
    {({loading, error, data}) => {

      if(loading) return <p>Loading...</p>
      if(error) return <p>Error!</p>

      return(
        <TableItemLimitContainer 
          selected={data.dashboardItemLimit}
          mutation={UPDATE_DASHBOARD_ITEM_LIMIT}
        />
      )

    }}
  </Query>
)

export default DashboardTableItemLimitContainer