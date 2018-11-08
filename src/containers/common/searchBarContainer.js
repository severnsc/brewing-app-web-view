import React from 'react'
import PropTypes from 'prop-types'
import { SearchBar } from '../../components'
import { Mutation } from 'react-apollo'

const SearchBarContainer = ({ mutation, placeholder }) => (
  <Mutation mutation={mutation}>
    {mutation => {

      const updateFilter = value => {
        mutation({ variables: { value: value.toLowerCase() }})
      }

      return(
        <SearchBar
          onSubmit={updateFilter}
          onChange={updateFilter}
          placeholder={placeholder}
        />
      )
    }}
  </Mutation>
)

SearchBarContainer.propTypes = {
  mutation: PropTypes.object.isRequired,
  placeholder: PropTypes.string
}

export default SearchBarContainer