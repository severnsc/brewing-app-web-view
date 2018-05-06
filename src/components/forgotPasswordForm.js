import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { sendRecoveryEmail } from '../auth'

class ForgotPasswordForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: ""
    }
  }

  handleUsername(e) {
    this.setState({username: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    sendRecoveryEmail(this.state.username)
      .then(res => this.props.navigate())
      .err(e => e)
  }

  render(){

    return(
      <div>
        <h2>Forgot Password</h2>
        <p>We'll send you an email so that you can recover your password</p>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Username
            <input type="text" value={this.state.username} onChange={e => this.handleUsername(e)} />
          </label>
          <input type="submit" value="Send email" />
        </form>
      </div>
    )

  }

}

ForgotPasswordForm.propTypes = {
  navigate: PropTypes.func.isRequired
}

export default ForgotPasswordForm