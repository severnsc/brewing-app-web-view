import React from 'react'
import styles from "./styles"
import PropTypes from 'prop-types'

const SortableTable = ({ children }) => {

  return(
    <div style={styles.container}>
      <table style={styles.table}>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )

}

SortableTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default SortableTable