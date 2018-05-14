import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import SortableTable from '../../components/sortableTable'

const SortableTableContainer = ({sortOrderMutation, columns, tableRows, sort, itemsPerPage, itemsPerPageMutation, currentPage}) => (
  <Mutation mutation={sortOrderMutation}>
    {sortMutation => {

      const toggleSortOrder = cellName => {
        sortMutation({ variables: {cellName: cellName} })
      }

      return(
        <Mutation mutation={itemsPerPageMutation}>
          {itemsMutation => {

            const onItemsPerPageChange = value => {
              itemsMutation({ variables: { value: value } })
            }

            return(
              <SortableTable
                columns={columns}
                toggleSortOrder={toggleSortOrder}
                tableRows={tableRows}
                sort={sort}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                currentPage={currentPage}
              />
            )
          }}
        </Mutation>
      )
    }}
  </Mutation>
)

SortableTableContainer.propTypes = {
  sortOrderMutation: PropTypes.object.isRequired,
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
  }),
  itemsPerPage: PropTypes.oneOf([25, 50, 100]).isRequired,
  itemsPerPageMutation: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default SortableTableContainer