import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'

const TableItemLimitContainer = ({ mutation, selected }) => (
  <Mutation mutation={mutation}>
    {mutation => {

      const handleChange = e => {
        mutation({ variables: { value: e.target.value }})
      }

      return(
        <Fragment>
          <span>View top</span>
          <select value={selected} onChange={handleChange}>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>items</span>
        </Fragment>
      )
    }}
  </Mutation>
)

TableItemLimitContainer.propTypes = {
  mutation: PropTypes.object.isRequired
}

export default TableItemLimitContainer