import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Main from './Main'
import Header from './Header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header isLoggedIn={() => false} />
        <Main />
      </div>
    );
  }
}

const AppWithRouting = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default AppWithRouting;
