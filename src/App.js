import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.scss";
import "./assets/scss/general.scss";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Navbar/>
        <Main/>
      </div>
    );
  }
}

export default hot(module)(App);