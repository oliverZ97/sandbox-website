import React, { Component } from "react";
import "../assets/scss/pages/CharacterCreator.scss";

class MonsterCreator extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="d-flex flex-row">
                <div className="card">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-around">
                            <div className="input-label">
                                <label htmlFor="name">Vorname</label>
                                <input className="input" name="name" type="text"></input>
                            </div>
                            <div className="input-label">
                                <label htmlFor="name">Nachname</label>
                                <input className="input" name="name" type="text"></input>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <div className="input-label">
                                <label htmlFor="race">Rasse</label>
                                <select className="input" name="race">
                                    <option>Elf</option>
                                    <option>Gnom</option>
                                    <option>Halbling</option>
                                    <option>Mensch</option>
                                    <option>Zwerg</option>
                                </select>
                            </div>
                            <div className="input-label">
                                <label htmlFor="class">Klasse</label>
                                <select className="input" name="class">
                                    <option>Barbar</option>
                                    <option>Krieger</option>
                                    <option>Magier</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="card">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-around">
                            <div className="input-label">
                                <label htmlFor="ST">ST</label>
                                <input className="input" name="ST" type="number" min="1" max="100"></input>
                            </div>
                            <div className="input-label">
                                <label htmlFor="GS">GS</label>
                                <input className="input" name="GS" type="number" min="1" max="100"></input>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <div className="input-label">
                                <label htmlFor="GW">GW</label>
                                <input className="input" name="GW" type="number" min="1" max="100"></input>
                            </div>
                            <div className="input-label">
                                <label htmlFor="KO">KO</label>
                                <input className="input" name="KO" type="number" min="1" max="100"></input>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-around">
                            <div className="input-label">
                                <label htmlFor="IN">IN</label>
                                <input className="input" name="IN" type="number" min="1" max="100"></input>
                            </div>
                            <div className="input-label">
                                <label htmlFor="ZT">ZT</label>
                                <input className="input" name="ZT" type="number" min="1" max="100"></input>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
}

export default MonsterCreator;