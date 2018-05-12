import React, { Fragment } from 'react'
import { Query, Mutation } from 'react-apollo'
import { dashboardTableFilterQuery } from '../queries'
import { UPDATE_DASHBOARD_TABLE_FILTER_SCOPE } from '../mutations'

const DashboardFilterSelectContainer = () => (
  <Query query={dashboardTableFilterQuery}>
    {({loading, error, data}) => {

      if(loading) return <p>Loading...</p>
      if(error) return <p>Error!</p>

      const firstChecked = data.dashboardTableFilter.filterScope === "CURRENT_VIEW" ? true : false
      const secondChecked = data.dashboardTableFilter.filterScope === "ALL_ITEMS" ? true : false

      return(
        <Mutation mutation={UPDATE_DASHBOARD_TABLE_FILTER_SCOPE}>
          {mutation => {

            const handleChange = type => {
              mutation({ variables: { type: type }})
            }

            return(
              <Fragment>
                <label>
                  <input
                    type="radio"
                    checked={firstChecked}
                    onChange={() => handleChange("CURRENT_VIEW")} 
                  />
                  Filter current view
                </label>
                <label>
                  <input
                    type="radio"
                    checked={secondChecked}
                    onChange={() => handleChange("ALL_ITEMS")}
                  />
                  Filter all items
                </label>
              </Fragment>
            )
          }}
        </Mutation>
      )
    }}
  </Query>
)

export default DashboardFilterSelectContainer