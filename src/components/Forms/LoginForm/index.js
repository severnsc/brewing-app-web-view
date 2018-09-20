import React, { Component } from 'react'
import formStyles from "../styles"
import globalStyles from "../../styles"
import styles from "./styles"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class LoginForm extends Component {

  state = {
    username: "",
    password: "",
    usernameFocus: false,
    passwordFocus: false
  }

  handleUsername = e => {
    this.setState({username: e.target.value})
  }

  handlePassword = e => {
    this.setState({password: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  toggleFocus = e => {
    const newState = {}
    newState[e.target.name+"Focus"] = !this.state[e.target.name+"Focus"]
    this.setState(newState)
  }

  render() {
    return(
      <div style={formStyles.container}>
        <h1 style={{...globalStyles.heading, ...styles.title}}>Brewing App</h1>
        <h2 style={globalStyles.subHeading}>Login</h2>
        <form onSubmit={e => this.onSubmit(e)} style={styles.form}>
          {this.props.error}
          <label style={this.state.usernameFocus ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Username
            <input autoFocus style={this.state.usernameFocus ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="username" value={this.state.username} type="text" onChange={e => this.handleUsername(e)} />
          </label>
          <label style={this.state.passwordFocus ? {...formStyles.label, ...formStyles.labelFocus} : formStyles.label}>Password
            <input style={this.state.passwordFocus ? {...formStyles.input, ...formStyles.inputFocus} : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} value={this.state.password} name="password" type ="password" onChange={e => this.handlePassword(e)} />
          </label>
          <span style={styles.login}>
            <input style={globalStyles.button} type="submit" value="Login" />
            <Link style={styles.link} to="/forgotPassword">Forgot password?</Link>
          </span>
        </form>
      </div>
    )
  }

}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default LoginForm