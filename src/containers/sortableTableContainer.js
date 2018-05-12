import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import SortableTable from '../components/sortableTable'
import { UPDATE_DASHBOARD_TABLE_SORT } from "../mutations"

const SortableTableContainer = ({columns, tableRows, sort}) => (
  <Mutation mutation={UPDATE_DASHBOARD_TABLE_SORT}>
    {updateDashboardTableSort => {

      const toggleSortOrder = cellName => {
        updateDashboardTableSort({ variables: {cellName: cellName} })
      }

      return(
        <SortableTable
          columns={columns}
          toggleSortOrder={toggleSortOrder}
          tableRows={tableRows}
          sort={sort}
        />
      )
    }}
  </Mutation>
)

SortableTableContainer.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    cells: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      columnName: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })).isRequired
  })).isRequired,
  sort: PropTypes.shape({
    sortBy: PropTypes.string.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired
  })
}

export default SortableTableContainer