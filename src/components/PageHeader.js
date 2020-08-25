import React, { Component } from "react";
import "../assets/scss/components/PageHeader.scss";

class PageHeader extends Component {
  render() {
    return (
        <div className="pageheader">
            <h2 className="text-light">Dungeon</h2>
        </div>
    );
  }
}

export default PageHeader;