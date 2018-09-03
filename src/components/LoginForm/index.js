import React, { Component } from 'react'
import styles from "./styles"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class LoginForm extends Component {

  state = {
    username: "",
    password: ""
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
    this.setState({ username: "", password: "" })
  }

  render() {
    return(
      <div style={styles.flexColumn}>
        <h2>Login</h2>
        <form onSubmit={e => this.onSubmit(e)} style={styles.flexColumn}>
          {this.props.error}
          <label>Username
            <input value={this.state.username} type="text" onChange={e => this.handleUsername(e)} />
          </label>
          <label>Password
            <input value={this.state.password} type ="password" onChange={e => this.handlePassword(e)} />
          </label>
          <input type="submit" value="Login" />
        </form>
        <Link to="/forgotPassword">Forgot password?</Link>
      </div>
    )
  }

}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string
}

export default LoginForm