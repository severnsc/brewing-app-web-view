import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchBar extends Component {

  constructor(props){
    super(props)
    this.state = {
      value: ""
    }
  }

  handleChange(e) {
    if(this.props.onChange) this.props.onChange(e.target.value)
    this.setState({value: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.value)
  }

  render(){

    return(

      <form style={{display:"flex", margin:"10px"}} onSubmit={e => this.handleSubmit(e)}>
        <input 
          style={{flex:"1", borderRadius:"10px", border:"1px solid #8c8c8c", padding:"2px"}}
          type="text"
          value={this.state.value}
          onChange={e => this.handleChange(e)}
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