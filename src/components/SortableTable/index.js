import React from 'react'
import styles from "./styles"
import PropTypes from 'prop-types'
import { HoverableTableRow } from '..'

const SortableTable = ({ columns, sortBy, sortOrder, toggleSort, itemsPerPageOptions, itemsPerPage, onItemsPerPageChange, currentPage, decrementPage, incrementPage, onTableRowClick, customSort }) => {

  const sortIndicator = sortOrder === "asc" ? "∧" : "∨"

  const headerCells = columns.map(column => {
    if(column.name === sortBy){
      return {...column, name: `${column.name} ${sortIndicator}`}
    }else{
      return column
    }
  })

  const handleClick = cellName => toggleSort(cellName)

  const handleItemsPerPageChange = e => onItemsPerPageChange(e.target.value)

  const startIndex = currentPage*itemsPerPage
  const endIndex = (currentPage + 1) * itemsPerPage
  const currentPageTableRows = sortedTableRows.slice(startIndex, endIndex)

  const previousPageButton = currentPage > 0 ? <span style={styles.leftPageButton} onClick={decrementPage}>&lt; Previous</span> : <span style={styles.pageButton} ></span>

  const lastPage = Math.ceil(tableRows.length/itemsPerPage) - 1
  const nextPageButton = currentPage < lastPage ? <span style={styles.rightPageButton} onClick={incrementPage}>Next &gt;</span> : <span style={styles.pageButton} ></span>

  const widthPercentage = 100/columns.length

  const optionElements = itemsPerPageOptions.map(option => 
    <option key={option} value={option}>{option}</option>
  )

  return(
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.tableHead}>
          <tr>
            {headerCells.map((cell, index) => (
              <th style={{...styles.tableHeadCell, width: `${widthPercentage}%`}} key={cell.id} onClick={() => handleClick(columns[index].name)}>
                {cell.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
      <div style={styles.footer}>
        {previousPageButton}
        <span style={styles.span}>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {optionElements}
          </select>
          <span style={styles.itemsPerPage}>items per page</span>
        </span>
        {nextPageButton}
      </div>
    </div>
  )

}

SortableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.oneOf(["asc", "desc"]).isRequired,
  toggleSort: PropTypes.func.isRequired,
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  decrementPage: PropTypes.func.isRequired,
  incrementPage: PropTypes.func.isRequired,
  onTableRowClick: PropTypes.func,
  customSort: PropTypes.object
}

export default SortableTable