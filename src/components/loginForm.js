import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

class LoginForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      errorText: "",
      toDashboard: false
    }
  }

  handleUsername(e) {
    this.setState({username: e.target.value})
  }

  handlePassword(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.loginUser(this.state.username, this.state.password)
      .then(res => {
        console.log(res)
        if(res.data === "Please login"){
          this.setState({errorText: "Invalid username or password!"})
        }else{
          this.setState({toDashboard: true}, this.props.logIn)
        }
      })
      .catch(e => e)
  }

  render() {

    if(this.state.toDashboard){
      return <Redirect to="/dashboard" />
    }

    const flexColumnStyle = {
      display: "flex",
      flexDirection:"column"
    }

    return(
      <div style={flexColumnStyle}>
        <h2>Login</h2>
        <form onSubmit={e => this.onSubmit(e)} style={flexColumnStyle}>
          {this.state.errorText}
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
  loginUser: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired
}

export default LoginForm