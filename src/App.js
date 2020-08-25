import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.scss";
import "./assets/scss/general.scss";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Header from "./components/Header";

const pages = [
  {
    id: 1,
    name: "Dice Tool",
    icon: "fa-dice-d20"
  },
  {
    id: 2,
    name: "Test 2",
    icon: "fa-dragon"
  },
  {
    id: 3,
    name: "Test 3",
    icon: "fa-fan"
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ""
    }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Navbar pages={pages}/>
        <Main/>
      </div>
    );
  }
}

export default hot(module)(App);