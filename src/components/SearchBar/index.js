import React, { Component } from 'react'
import styles from "./styles"
import PropTypes from 'prop-types'

class SearchBar extends Component {

  state = {
    value: ""
  }

  handleChange = e => {
    if(this.props.onChange) this.props.onChange(e.target.value)
    this.setState({value: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render(){

    return(

      <form style={styles.form} onSubmit={this.handleSubmit}>
        <input 
          style={styles.input}
          type="search"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
      </form>

    )

  }

}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}

export default SearchBar