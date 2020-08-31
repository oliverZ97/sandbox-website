import React, { Component } from "react";
import "../assets/scss/pages/MonsterCreator.scss";

class MonsterCreator extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <div>
                    <label for="name">Name</label>
                    <input className="input" name="name" type="text"></input>
                </div>

                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <label for="ST">ST</label>
                        <input name="ST" type="number" min="1" max="100"></input>
                        <label for="GS">GS</label>
                        <input name="GS" type="number" min="1" max="100"></input>
                    </div>
                    <div className="d-flex flex-row">
                        <label for="GW">GW</label>
                        <input name="GW" type="number" min="1" max="100"></input>
                        <label for="KO">KO</label>
                        <input name="KO" type="number" min="1" max="100"></input>
                    </div>
                    <div className="d-flex flex-row">
                        <label for="IN">IN</label>
                        <input name="IN" type="number" min="1" max="100"></input>
                        <label for="ZT">ZT</label>
                        <input name="ZT" type="number" min="1" max="100"></input>
                    </div>
                </div>
            </div>
        );
    }
}

export default MonsterCreator;