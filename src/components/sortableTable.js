import React from 'react'
import PropTypes from 'prop-types'
import HoverableTableRow from './hoverableTableRow'
import shortid from "shortid"

const SortableTable = ({ columns, tableRows, sortBy, sortOrder, toggleSort, itemsPerPage, onItemsPerPageChange, currentPage, decrementPage, incrementPage, onTableRowClick }) => {

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

  const sortedTableRows = tableRows.concat().sort((tableRowA, tableRowB) => {

    const sortByIndex = columns.indexOf(sortBy)

    let aValue = tableRowA.cells[sortByIndex]
    let bValue = tableRowB.cells[sortByIndex]

    if(typeof aValue === 'string'){
      aValue = aValue.toLowerCase()
    }

    if(typeof bValue === 'string'){
      bValue = bValue.toLowerCase()
    }
    
    if(sortOrder === "asc"){
      if(aValue < bValue){
        return -1
      }

      if(aValue > bValue){
        return 1
      }

      return 0
    }else{
      if(aValue < bValue){
        return 1
      }

      if(aValue > bValue){
        return -1
      }

      return 0
    }
  })

  const startIndex = currentPage*itemsPerPage
  const endIndex = (currentPage + 1) * itemsPerPage
  const currentPageTableRows = sortedTableRows.slice(startIndex, endIndex)

  const pageButtonStyle = {
    textDecoration: "underline",
    cursor:"pointer",
    width: "86.73px"
  }

  const previousPageButton = currentPage > 0 ? <span style={{...pageButtonStyle, textAlign: "left"}} onClick={decrementPage}>&lt; Previous</span> : <span style={pageButtonStyle} ></span>

  const lastPage = Math.ceil(tableRows.length/itemsPerPage) - 1
  const nextPageButton = currentPage < lastPage ? <span style={{...pageButtonStyle, textAlign: "right"}} onClick={incrementPage}>Next &gt;</span> : <span style={pageButtonStyle} ></span>

  const widthPercentage = 100/columns.length

  return(
    <div style={{display: "flex", "flexFlow": "column"}}>
      <table style={{border: "1px solid", margin: "10px", borderCollapse: "collapse"}}>
        <thead style={{backgroundColor: "#e8e8e8"}}>
          <tr>
            {headerCells.map((cell, index) => (
              <th style={{border: "1px solid", width: `${widthPercentage}%`, padding: "10px"}} key={cell.id} onClick={() => handleClick(columns[index].name)}>
                {cell.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageTableRows.map(row => {
            return (
              <HoverableTableRow onClick={onTableRowClick} key={row.id} id={row.id}>
                {row.cells.map((cell, index) => 
                  <td key={index} style={{border: "1px solid", width: `${widthPercentage}%`}}>{cell}</td>)}
              </HoverableTableRow>
            )
          })}
        </tbody>
      </table>
      <div style={{display: "flex", margin:"0 10px"}}>
        {previousPageButton}
        <span style={{flex: "1"}}>
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span style={{marginLeft: "5px"}}>items per page</span>
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
  tableRows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      cells: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    })
  ).isRequired,
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.oneOf(["asc", "desc"]).isRequired,
  toggleSort: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.oneOf([25, 50, 100]).isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  decrementPage: PropTypes.func.isRequired,
  incrementPage: PropTypes.func.isRequired,
  onTableRowClick: PropTypes.func
}

export default SortableTable