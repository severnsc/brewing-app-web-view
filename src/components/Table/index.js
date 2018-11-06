import React from 'react'
import styles from "./styles"
import PropTypes from 'prop-types'

const Table = ({ children }) => {

  return(
    <div style={styles.container}>
      <table style={styles.table}>
        {children}
      </table>
    </div>
  )

}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default Table