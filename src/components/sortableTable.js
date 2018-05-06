import React from 'react'
import PropTypes from 'prop-types'

const SortableTable = ({ columns, sort, toggleSortOrder }) => {

  let sortIndicator = "∧"
  let sortIndex = 0
  if(sort){
    if(sort.order === "desc") sortIndicator = "∨"
    sortIndex = sort.sortBy
  }

  const headerCells = columns.map((column, index) => {
    if(index === sortIndex || column.name === sortIndex){
      return {id: column.id, name: `${column.name} ${sortIndicator}`}
    }else{
      return {id: column.id, name: column.name}
    }
  })

  const handleClick = cellName => toggleSortOrder(cellName)

  return(
    <table>
      <thead>
        <tr>
          {headerCells.map((cell, index) => (
            <th key={cell.id} onClick={() => handleClick(cell.name)}>
              {cell.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  )

}

SortableTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
  sort: PropTypes.shape({
    sortBy: PropTypes.string.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired
  }),
  toggleSortOrder: PropTypes.func.isRequired
}

export default SortableTable