import React from 'react'
import PropTypes from 'prop-types'
import { SearchBar } from '../../components'
import { Mutation } from 'react-apollo'

const SearchBarContainer = ({ mutation }) => (
  <Mutation mutation={mutation}>
    {mutation => {

      const updateFilter = value => {
        mutation({ variables: { value: value }})
      }

      return(
        <SearchBar
          onSubmit={updateFilter}
          onChange={updateFilter}
          placeholder="Search"
        />
      )
    }}
  </Mutation>
)

SearchBarContainer.propTypes = {
  mutation: PropTypes.object.isRequired
}

export default SearchBarContainer