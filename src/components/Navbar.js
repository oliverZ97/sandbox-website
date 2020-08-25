import React, { Component } from "react";
import "../assets/scss/components/Navbar.scss";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="opacity-container"></div>
        <ul className="navbar-content">
            <li><div className="title-container"><i className="fas fa-camera icon-small icon-mr"></i><p>Test</p></div></li>
            <li><div className="title-container"><i className="fas fa-camera icon-small icon-mr"></i><p>Test</p></div></li>
            <li><div className="title-container"><i className="fas fa-camera icon-small icon-mr"></i><p>Test</p></div></li>
            <li><div className="title-container"><i className="fas fa-camera icon-small icon-mr"></i><p>Test</p></div></li>
            <li><div className="title-container"><i className="fas fa-camera icon-small icon-mr"></i><p>Test</p></div></li>
            <li><div className="title-container"><i className="fas fa-camera icon-small icon-mr"></i><p>Test</p></div></li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;