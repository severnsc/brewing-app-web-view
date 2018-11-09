import React from 'react'
import PropTypes from 'prop-types'
import { SearchBar } from '../../components'
import { Mutation } from 'react-apollo'

const SearchBarContainer = ({ name, mutation, placeholder }) => (
  <Mutation mutation={mutation}>
    {mutation => {

      const updateFilter = filterString => {
        mutation({ variables: { name, filterString: filterString.toLowerCase() }})
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
  name: PropTypes.string.isRequired,
  mutation: PropTypes.object.isRequired,
  placeholder: PropTypes.string
}

export default SearchBarContainer