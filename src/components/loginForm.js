import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { loginUser } from '../auth.js'

class LoginForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      errorText: ""
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
    loginUser(this.state.username, this.state.password)
      .then(res => {
        console.log(res)
        if(res.data === "Please login"){
          this.setState({errorText: "Invalid username or password!"})
        }else{
          this.props.navigate()
        }
      })
      .catch(e => e)
  }

  render() {

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
        <a href="#">Forgot password?</a>
      </div>
    )
  }

}

LoginForm.propTypes = {
  navigate: PropTypes.func.isRequired
}

export default LoginForm