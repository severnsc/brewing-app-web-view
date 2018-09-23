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
    focus: ""
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
    if(e.type === "focus"){
      this.setState({ focus: e.target.name })
    }

    if(e.type === "blur"){
      this.setState({ focus: "" })
    }
  }

  render() {

    const { username, password, focus } = this.state
    const { error } = this.props

    const labelFocusStyle = {...formStyles.label, ...formStyles.labelFocus}
    const inputFocusStyle = {...formStyles.input, ...formStyles.inputFocus}

    return(
      <div style={formStyles.container}>
        <h1 style={{...globalStyles.heading, ...styles.title}}>Brewing App</h1>
        <h2 style={globalStyles.subHeading}>Login</h2>
        <form onSubmit={e => this.onSubmit(e)} style={styles.form}>
          <span style={globalStyles.error}>{error}</span>
          <label style={focus === "username" ? labelFocusStyle : formStyles.label}>Username
            <input autoFocus style={focus === "username" ? inputFocusStyle : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} name="username" value={username} type="text" onChange={e => this.handleUsername(e)} />
          </label>
          <label style={focus === "password" ? labelFocusStyle : formStyles.label}>Password
            <input style={focus === "password" ? inputFocusStyle : formStyles.input} onFocus={this.toggleFocus} onBlur={this.toggleFocus} value={password} name="password" type ="password" onChange={e => this.handlePassword(e)} />
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