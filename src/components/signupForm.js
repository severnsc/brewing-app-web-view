import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isUsernameUnique } from '../adapters/userAdapter'
import { createUser } from '../auth'


class SignupForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      usernameErrorText: ""
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.username !== prevState.username){
      isUsernameUnique(this.state.username)
        .then(bool => {
          console.log(bool)
          if(bool && prevState.usernameErrorText !== ""){
            this.setState({usernameErrorText: ""})
          }

          if(!bool && prevState.usernameErrorText === ""){
            this.setState({usernameErrorText: "Username already taken!"})
          }
        })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    createUser(this.state.username, this.state.password)
      .then(res => this.props.navigate())
      .catch(e => e)
  }

  handleUsername(event) {
    this.setState({username: event.target.value})
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

    const passwordErrorText = 0 < this.state.password.length && 
      this.state.password.length < 8 
      ? "Must be at least 8 characters!"
      : ""

    const confirmPasswordErrorText = this.state.password === 
                                      this.state.confirmPassword
                                      ? ""
                                      : "Must match password!"

    const submitDisabled = this.state.usernameErrorText !== "" ||
                           passwordErrorText !== "" ||
                           confirmPasswordErrorText !== "" ||
                           this.state.username === "" ||
                           this.state.password === ""

    return(
      <div style={flexColumnStyle}>
        <h2>Sign up</h2>
        <form style={flexColumnStyle} onSubmit={(e) => this.onSubmit(e)}>
          <label>Username
            <input type="text" value={this.state.username} onChange={(e) => this.handleUsername(e)} />
            <span>{this.state.usernameErrorText}</span>
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
      </div>
    )
  }

}

SignupForm.propTypes = {
  navigate: PropTypes.func.isRequired
}

export default SignupForm