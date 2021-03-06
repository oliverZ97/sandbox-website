import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.scss";
import "./assets/scss/general.scss";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Header from "./components/Header";

const pages = [
  {
    id: 0,
    name: "Home",
    icon: "fa-home"
  },
  {
    id: 1,
    name: "Dice Tool",
    icon: "fa-dice-d20"
  },
  {
    id: 2,
    name: "Character Creator",
    icon: "fa-dragon"
  },
  {
    id: 3,
    name: "GIF Board",
    icon: "fa-fan"
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ""
    }

    this.setActiveComponent = this.setActiveComponent.bind(this);
  }

  setActiveComponent(comp) {
    this.setState({
      active: comp
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Navbar setActive={this.setActiveComponent} pages={pages}/>
        <Main active={this.state.active}/>
      </div>
    );
  }
}

export default hot(module)(App);