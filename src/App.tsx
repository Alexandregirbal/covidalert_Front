import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Secured from './Secured';
import './App.css';
import MainPage from './container/MainPage/index';

class App extends Component {

  

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <MainPage/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;