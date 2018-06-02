import React, { Component } from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import { Link } from 'react-router-dom'

class SignupForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.username !== prevState.username){
      this.props.validateUsername(this.state.username)
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.createUser(this.state.username, this.state.password, this.state.email)
  }

  handleUsername(event) {
    this.setState({username: event.target.value})
  }

  handleEmail(event) {
    this.setState({email: event.target.value})
  }

  handlePassword(event) {
    this.setState({password: event.target.value})
  }

  handleConfirmPassword(event) {
    this.setState({confirmPassword: event.target.value})
  }

  render(){
    const flexColumnStyle = {
      display: "flex",
      flexDirection:"column"
    }

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
      <div style={flexColumnStyle}>
        <h2>Sign up</h2>
        {this.props.error}
        <form style={flexColumnStyle} onSubmit={(e) => this.onSubmit(e)}>
          <label>Username
            <input type="text" value={this.state.username} onChange={(e) => this.handleUsername(e)} />
            <span>{usernameErrorText}</span>
          </label>
          <label>Email
            <input type="email" value={this.state.email} onChange={(e) => this.handleEmail(e)} />
            <span>{emailErrorText}</span>
          </label>
          <label>Password
            <input type ="password" value={this.state.password} onChange={(e) => this.handlePassword(e)} />
            <span>{passwordErrorText}</span>
          </label>
          <label>Confirm password
            <input type ="password" value={this.state.confirmPassword} onChange={(e) => this.handleConfirmPassword(e)} />
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