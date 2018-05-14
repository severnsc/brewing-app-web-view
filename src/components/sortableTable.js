import React from 'react'
import PropTypes from 'prop-types'

const SortableTable = ({ columns, sort, toggleSortOrder, tableRows, itemsPerPage, onItemsPerPageChange, currentPage, decrementPage, incrementPage }) => {

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

  const handleItemsPerPageChange = e => onItemsPerPageChange(e.target.value)

  const sortedTableRows = tableRows.concat().sort((a, b) => {
    const columnToSortBy = cell => cell.columnName === sort.sortBy
    const aCell = a.cells.find(columnToSortBy)
    const bCell = b.cells.find(columnToSortBy)
    
    if(sort.order === "asc"){
      if(aCell.value < bCell.value){
        return -1
      }

      if(aCell.value > bCell.value){
        return 1
      }

      return 0
    }else{
      if(aCell.value < bCell.value){
        return 1
      }

      if(aCell.value > bCell.value){
        return -1
      }

      return 0
    }
  })

  const startIndex = currentPage*itemsPerPage
  const endIndex = (currentPage + 1) * itemsPerPage
  const currentPageTableRows = sortedTableRows.slice(startIndex, endIndex)

  return(
    <div>
      <table>
        <thead>
          <tr>
            {headerCells.map((cell, index) => (
              <th key={cell.id} onClick={() => handleClick(columns[index].name)}>
                {cell.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageTableRows.map(row => {
            return (
              <tr key={row.id}>
                {row.cells.map(cell => 
                  <td key={cell.id}>{cell.value}</td>)}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <span onClick={decrementPage}>Previous page</span>
        <span>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <p>items per page</p>
        </span>
        <span onClick={incrementPage}>Next page</span>
      </div>
    </div>
  )

}

SortableTable.propTypes = {
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
  toggleSortOrder: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.oneOf([25, 50, 100]).isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  decrementPage: PropTypes.func.isRequired,
  incrementPage: PropTypes.func.isRequired
}

export default SortableTable