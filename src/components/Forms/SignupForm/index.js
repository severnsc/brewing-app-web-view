import React, { Component } from 'react'
import globalStyles from "../../styles"
import formStyles from "../styles"
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
    focus: ""
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
    if(e.type === "focus"){
      this.setState({ focus: e.target.name })
    }

    if(e.type === "blur"){
      this.setState({ focus: "" })
    }
  }

  render(){

    const {
      username,
      email,
      password,
      confirmPassword,
      focus
    } = this.state

    const { error, isUsernameUnique } = this.props

    const emailErrorText = email.length === 0 || validator.isEmail(email)
                           ? ""
                           : "Invalid email!"

    const passwordErrorText = 0 < password.length && password.length < 8 
                              ? "Must be at least 8 characters!"
                              : ""

    const confirmPasswordErrorText = password === confirmPassword
                                     ? ""
                                     : "Must match password!"

    const usernameErrorText = username !== "" && !isUsernameUnique
                              ? "Username already taken!"
                              : ""

    const submitDisabled = usernameErrorText !== "" ||
                           emailErrorText !== "" ||
                           passwordErrorText !== "" ||
                           confirmPasswordErrorText !== "" ||
                           username === "" ||
                           email === "" ||
                           password === ""

    const isErrorState = errorText => errorText ? {...formStyles.inputFocus, ...formStyles.error} : formStyles.inputFocus

    const usernameInputFocusStyle = isErrorState(usernameErrorText)
    const emailInputFocusStyle = isErrorState(emailErrorText)
    const passwordInputFocusStyle = isErrorState(passwordErrorText)
    const confirmPasswordInputFocusStyle = isErrorState(confirmPasswordErrorText)

    return(
      <div style={formStyles.container}>
        <h1 style={{...globalStyles.heading, ...styles.title}}>Brewing App</h1> 
        <h2 style={globalStyles.subHeading}>Sign up</h2>
        {error}
        <form className="signupForm" style={styles.form} onSubmit={this.onSubmit}>
          <label style={focus === "username" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Username
            <input autoFocus style={focus === "username" ? {...formStyles.input, ...usernameInputFocusStyle} : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="username" type="text" value={username} onChange={this.handleChange} />
            <span style={usernameErrorText ? formStyles.errorText : null}>{usernameErrorText}</span>
          </label>
          <label style={focus === "email" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Email
            <input style={focus === "email" ? {...formStyles.input, ...emailInputFocusStyle} : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="email" type="email" value={email} onChange={this.handleChange} />
            <span style={emailErrorText ? formStyles.errorText : null}>{emailErrorText}</span>
          </label>
          <label style={focus === "password" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Password
            <input style={focus === "password" ? {...formStyles.input, ...passwordInputFocusStyle} : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="password" type ="password" value={password} onChange={this.handleChange} />
            <span style={passwordErrorText ? formStyles.errorText : null}>{passwordErrorText}</span>
          </label>
          <label style={focus === "confirmPassword" ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Confirm password
            <input style={focus === "confirmPassword" ? {...formStyles.input, ...confirmPasswordInputFocusStyle} : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="confirmPassword" type ="password" value={confirmPassword} onChange={this.handleChange} />
            <span style={confirmPasswordErrorText ? formStyles.errorText : null}>{confirmPasswordErrorText}</span>
          </label>
          <span style={styles.submit}>
            <input style={submitDisabled ? {...globalStyles.button, ...formStyles.disabled} : globalStyles.button} disabled={submitDisabled} type="submit" value="Sign Up" />
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