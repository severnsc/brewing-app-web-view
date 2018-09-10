import React, { Component } from 'react'
import PropTypes from 'prop-types'
import globalStyles from "../../styles"
import formStyles from "../styles"
import styles from "./styles"

class ForgotPasswordForm extends Component {

  state = {
    username: "",
    focus: false
  }

  handleUsername = e => {
    this.setState({username: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.sendRecoveryEmail(this.state.username)
    this.props.navigate()
  }

  toggleFocus = e => {
    this.setState((prevState, props) => ({focus: !prevState.focus}))
  }

  render(){
    
    return(
      <div style={formStyles.container}>
        <h1 style={globalStyles.heading}>Brewing App</h1>
        <h2 style={globalStyles.subHeading}>Forgot Password</h2>
        <p style={styles.text}>We'll send you an email so that you can recover your password</p>
        <form style={styles.form} onSubmit={e => this.handleSubmit(e)}>
          <label style={this.state.focus ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Username
            <input autoFocus style={this.state.focus ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} type="text" value={this.state.username} onChange={e => this.handleUsername(e)} />
          </label>
          <input style={styles.button} type="submit" value="Send email" />
        </form>
      </div>
    )

  }

}

ForgotPasswordForm.propTypes = {
  sendRecoveryEmail: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired
}

export default ForgotPasswordForm