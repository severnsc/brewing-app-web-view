import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ResetPasswordForm from './components/resetPasswordForm'
import ForgotPasswordForm from './components/forgotPasswordForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ForgotPasswordForm navigate={() => console.log("navigated!")} />
        <ResetPasswordForm navigate={() => console.log("navigated!")} />
      </div>
    );
  }
}

export default App;
