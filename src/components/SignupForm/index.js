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
    confirmPassword: ""
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

    return(
      <div style={styles.flexColumn}>
        <h2>Sign up</h2>
        {this.props.error}
        <form style={styles.flexColumn} onSubmit={this.onSubmit}>
          <label>Username
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
            <span>{usernameErrorText}</span>
          </label>
          <label>Email
            <input name="email" type="email" value={this.state.email} onChange={this.handleChange} />
            <span>{emailErrorText}</span>
          </label>
          <label>Password
            <input name="password" type ="password" value={this.state.password} onChange={this.handleChange} />
            <span>{passwordErrorText}</span>
          </label>
          <label>Confirm password
            <input name="confirmPassword" type ="password" value={this.state.confirmPassword} onChange={this.handleChange} />
            <span>{confirmPasswordErrorText}</span>
          </label>
          <input disabled={submitDisabled} type="submit" value="Sign Up" />
        </form>
        <p>Already have an account?</p>
        <Link to="/login">Log in</Link>
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