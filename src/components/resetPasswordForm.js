import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { resetPassword } from '../auth'

class ResetPasswordForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      password: "",
      confirmPassword: ""
    }
  }

  handlePassword(e) {
    this.setState({password: e.target.value})
  }

  handleConfirmPassword(e) {
    this.setState({confirmPassword: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    resetPassword(this.state.password)
    this.props.navigate()
  }

  render() {
    
    const passwordErrorText = 0 < this.state.password.length && 
                                this.state.password.length < 8
                              ? "Must be at least 8 characters!"
                              : ""

    const confirmPasswordErrorText = this.state.confirmPassword !== 
                                       this.state.password
                                     ? "Must match password!"
                                     : ""

    const buttonDisabled = passwordErrorText !== "" || 
                            confirmPasswordErrorText !== ""
                            ? true
                            : false

    return (
      <div>
        <h2>Reset Password</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Password
            <input type="password" value={this.state.password} onChange={e => this.handlePassword(e)} />
            <span>{passwordErrorText}</span>
          </label>
          <label>Confirm Password
            <input type="password" value={this.state.confirmPassword} onChange={e => this.handleConfirmPassword(e)} />
            <span>{confirmPasswordErrorText}</span>
          </label>
          <input disabled={buttonDisabled} type="submit" value="Reset password" />
        </form>
      </div>
    )
  }

}

ResetPasswordForm.propTypes = {
  navigate: PropTypes.func.isRequired
}

export default ResetPasswordForm