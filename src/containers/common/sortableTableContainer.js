import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import SortableTable from '../../components/sortableTable'

const SortableTableContainer = ({sortOrderMutation, columns, tableRows, sortBy, sortOrder, itemsPerPage, itemsPerPageMutation, currentPage, pageNumberMutation }) => (
  <Mutation mutation={sortOrderMutation}>
    {sortMutation => {

      const toggleSort = cellName => {
        sortMutation({ variables: {cellName: cellName} })
      }

      return(
        <Mutation mutation={itemsPerPageMutation}>
          {itemsMutation => {

            const onItemsPerPageChange = value => {
              itemsMutation({ variables: { value: value } })
            }

            return(
              <Mutation mutation={pageNumberMutation}>
                {pageNumMutation => {

                  const decrementPage = () => {
                    pageNumMutation({ variables: {type: "DECREMENT"} })
                  }

                  const incrementPage = () => {
                    pageNumMutation({ variables: {type: "INCREMENT"} })
                  }

                  return(
                    <SortableTable
                      columns={columns}
                      toggleSort={toggleSort}
                      tableRows={tableRows}
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      itemsPerPage={itemsPerPage}
                      onItemsPerPageChange={onItemsPerPageChange}
                      currentPage={currentPage}
                      decrementPage={decrementPage}
                      incrementPage={incrementPage}
                    />
                  )
                }}
              </Mutation>
            )
          }}
        </Mutation>
      )
    }}
  </Mutation>
)

SortableTableContainer.propTypes = {
  sortOrderMutation: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    cells: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ).isRequired
  })).isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.oneOf(["asc", "desc"]).isRequired,
  itemsPerPage: PropTypes.oneOf([25, 50, 100]).isRequired,
  itemsPerPageMutation: PropTypes.object.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageNumberMutation: PropTypes.object.isRequired
}

export default SortableTableContainer