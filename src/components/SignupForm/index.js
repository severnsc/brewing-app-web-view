import React, { Component } from 'react'
import styles from "./styles"
import PropTypes from 'prop-types'
import validator from 'validator'
import { Link } from 'react-router-dom'

class SignupForm extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    usernameFocus: false,
    emailFocus: false,
    passwordFocus: false,
    confirmPasswordFocus: false
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.username !== prevState.username){
      this.props.validateUsername(this.state.username)
    }
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.createUser(this.state.username, this.state.password, this.state.email)
  }

  handleChange = e => {
    const object = {}
    object[e.target.name] = e.target.value
    this.setState(object)
  }

  toggleFocus = e => {
    const newState = {}
    newState[e.target.name+"Focus"] = !this.state[e.target.name+"Focus"]
    this.setState(newState)
  }

  render(){

    const emailErrorText = this.state.email.length === 0 ||
                           validator.isEmail(this.state.email)
                           ? ""
                           : "Invalid email!"

    const passwordErrorText = 0 < this.state.password.length && 
      this.state.password.length < 8 
      ? "Must be at least 8 characters!"
      : ""

    const confirmPasswordErrorText = this.state.password === 
                                      this.state.confirmPassword
                                      ? ""
                                      : "Must match password!"

    const usernameErrorText = this.state.username !== "" &&
                              !this.props.isUsernameUnique
                              ? "Username already taken!"
                              : ""

    const submitDisabled = usernameErrorText !== "" ||
                           emailErrorText !== "" ||
                           passwordErrorText !== "" ||
                           confirmPasswordErrorText !== "" ||
                           this.state.username === "" ||
                           this.state.email === "" ||
                           this.state.password === ""

    const isErrorState = errorText => errorText ? {...styles.inputFocus, ...styles.error} : styles.inputFocus

    const usernameInputFocusStyle = isErrorState(usernameErrorText)
    const emailInputFocusStyle = isErrorState(emailErrorText)
    const passwordInputFocusStyle = isErrorState(passwordErrorText)
    const confirmPasswordInputFocusStyle = isErrorState(confirmPasswordErrorText)

    return(
      <div style={styles.flexColumn}>
        <h2>Sign up</h2>
        {this.props.error}
        <form className="signupForm" style={styles.flexColumn} onSubmit={this.onSubmit}>
          <label style={this.state.usernameFocus ? styles.labelFocus : styles.labelDefault}>Username
            <input autoFocus style={this.state.usernameFocus ? usernameInputFocusStyle : styles.inputDefault} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="username" type="text" value={this.state.username} onChange={this.handleChange} />
            <span style={usernameErrorText ? styles.errorText : null}>{usernameErrorText}</span>
          </label>
          <label style={this.state.emailFocus ? styles.labelFocus : styles.labelDefault}>Email
            <input style={this.state.emailFocus ? emailInputFocusStyle : styles.inputDefault} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="email" type="email" value={this.state.email} onChange={this.handleChange} />
            <span style={emailErrorText ? styles.errorText : null}>{emailErrorText}</span>
          </label>
          <label style={this.state.passwordFocus ? styles.labelFocus : styles.labelDefault}>Password
            <input style={this.state.passwordFocus ? passwordInputFocusStyle : styles.inputDefault} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="password" type ="password" value={this.state.password} onChange={this.handleChange} />
            <span style={passwordErrorText ? styles.errorText : null}>{passwordErrorText}</span>
          </label>
          <label style={this.state.confirmPasswordFocus ? styles.labelFocus : styles.labelDefault}>Confirm password
            <input style={this.state.confirmPasswordFocus ? confirmPasswordInputFocusStyle : styles.inputDefault} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="confirmPassword" type ="password" value={this.state.confirmPassword} onChange={this.handleChange} />
            <span style={confirmPasswordErrorText ? styles.errorText : null}>{confirmPasswordErrorText}</span>
          </label>
          <span style={styles.submit}>
            <input style={submitDisabled ? {...styles.button, ...styles.disabled} : styles.button} disabled={submitDisabled} type="submit" value="Sign Up" />
            <span style={styles.login}>or <Link style={styles.loginLink} to="/login">Log in</Link></span>
          </span>
        </form>
      </div>
    )
  }

}

SignupForm.propTypes = {
  validateUsername: PropTypes.func.isRequired,
  isUsernameUnique: PropTypes.bool.isRequired,
  createUser: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default SignupForm