import React, { Component } from "react";
import "../assets/scss/components/Header.scss";

class Header extends Component {
  render() {
    return (
        <div className="header">
            <h2 className="text-dark">Dungeon</h2>
            <p className="fas fa-dungeon icon-large icon-mt text-dark"></p>
            <h2 className="text-dark">Doors</h2>
        </div>
    );
  }
}

export default Header;